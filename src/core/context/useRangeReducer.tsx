import moment from "moment-jalaali";
import { useState, useReducer, useEffect, useCallback } from "react";
import { formatGenerator } from "../../utils/formatGenerator";
import { rangeTransformer } from "../../utils/rangeTransformer";
import { localizedMonth } from "../constants";
import { DateRangePickerTypes } from "../types";
import { Language, RangeDate, RangeValue } from "../types/global.types";
import {
  nextCacheDay,
  nextCacheMonthDecrease,
  nextCacheMonthIncrease,
} from "./rangeNextDate";
import { rangeReducer, ActionKind } from "./rangeReducer";

interface RangeDateReducerType {
  formatProp?: DateRangePickerTypes.Format;
  onChangeProp?: DateRangePickerTypes.OnChange;
  valueProp?: DateRangePickerTypes.RangeValue;
  defaultValueProp?: DateRangePickerTypes.RangeValue;
  onDayChangeProp?: DateRangePickerTypes.OnDayChange;
  onMonthChangeProp?: DateRangePickerTypes.OnMonthChange;
  onYearChangeProp?: DateRangePickerTypes.OnYearChange;
  language: Language;
}

const getDefaultValue = (value?: RangeValue, isJalaali = true): RangeDate => {
  if (value && value.length) {
    return {
      startDate: {
        day: 0,
        year: isJalaali ? value[0].jYear() : value[0].year(),
        month: Number(value[0].format(isJalaali ? "jM" : "M")),
      },
      endDate: {
        day: 0,
        year: isJalaali ? value[1].jYear() : value[1].year(),
        month: Number(value[1].format(isJalaali ? "jM" : "M")),
      },
    };
  }

  return {
    startDate: {
      day: 0,
      year: isJalaali ? moment().jYear() : moment().year(),
      month: Number(moment().format(isJalaali ? "jM" : "M")),
    },
    endDate: {
      day: 0,
      year: isJalaali ? moment().jYear() : moment().year(),
      month: Number(
        moment()
          .add(1, "month")
          .format(isJalaali ? "jM" : "M"),
      ),
    },
  };
};

export const useRangeReducer = ({
  formatProp,
  valueProp,
  defaultValueProp,
  onChangeProp,
  onDayChangeProp,
  onMonthChangeProp,
  onYearChangeProp,
  language,
}: RangeDateReducerType) => {
  const isJalaali = language === "fa";
  const months = localizedMonth[language];

  const [cacheRangeDate, setCacheRangeDate] = useState<RangeDate>(
    getDefaultValue(defaultValueProp, isJalaali),
  );
  const [rangeState, dispatch] = useReducer(
    rangeReducer,
    getDefaultValue(defaultValueProp, isJalaali),
  );

  useEffect(() => {
    if (valueProp && valueProp.length) {
      const values: RangeDate = {
        startDate: {
          day: isJalaali ? valueProp[0].jDate() : valueProp[0].date(),
          year: isJalaali ? valueProp[0].jYear() : valueProp[0].year(),
          month: Number(valueProp[0].format(isJalaali ? "jM" : "M")),
        },
        endDate: {
          day: isJalaali ? valueProp[1].jDate() : valueProp[1].date(),
          year: isJalaali ? valueProp[1].jYear() : valueProp[1].year(),
          month: Number(valueProp[1].format(isJalaali ? "jM" : "M")),
        },
      };
      setCacheRangeDate(values);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueProp]);

  const onRangeDateChange = useCallback(
    (payload: RangeDate) => {
      dispatch({ type: ActionKind.DATE, payload });

      setCacheRangeDate(payload);

      if (payload.endDate) {
        const dates = rangeTransformer({ ...payload });

        payload.startDate.day !== 0 &&
          payload.endDate.day !== 0 &&
          onChangeProp?.(
            dates,
            dates.map((date) =>
              date.format(
                formatProp
                  ? typeof formatProp === "function"
                    ? formatProp(date)
                    : formatProp
                  : formatGenerator(isJalaali),
              ),
            ) as [string, string],
          );
      }
    },
    [formatProp, isJalaali, onChangeProp],
  );
  const onRangeDaychange = useCallback(
    (payload: RangeDate) => {
      dispatch({ type: ActionKind.DAY, payload });

      setCacheRangeDate(payload);

      const { startDate, endDate } = payload;

      if (endDate) {
        startDate.day !== 0 &&
          endDate.day !== 0 &&
          onDayChangeProp?.([startDate.day, endDate.day]);
      }
    },
    [onDayChangeProp],
  );
  const onRangeMonthchange = useCallback(
    (payload: RangeDate) => {
      dispatch({ type: ActionKind.MONTH, payload });

      const { startDate, endDate } = payload;

      if (endDate) {
        onMonthChangeProp?.([
          {
            value: startDate.month,
            name:
              months.find((item) => item.id === startDate.month)?.name || "",
          },
          {
            value: endDate.month,
            name: months.find((item) => item.id === endDate.month)?.name || "",
          },
        ]);
      }
    },
    [months, onMonthChangeProp],
  );
  const onRangeYearchange = useCallback(
    (payload: RangeDate) => {
      dispatch({ type: ActionKind.YEAR, payload });

      const { startDate, endDate } = payload;

      if (endDate) {
        onYearChangeProp?.([startDate.year, endDate.year]);
      }
    },
    [onYearChangeProp],
  );
  const onRangeIncreaseYear = useCallback(
    (payload: RangeDate) => {
      dispatch({
        type: ActionKind.YEAR_PLUS,
        payload: {
          startDate: {
            ...payload.startDate,
            day:
              cacheRangeDate?.endDate?.year === payload.endDate?.year
                ? cacheRangeDate?.endDate?.day || 0
                : 0,
          },
          endDate: nextCacheDay(payload, cacheRangeDate),
        },
      });
    },
    [cacheRangeDate],
  );
  const onRangeDecreaseYear = useCallback(
    (payload: RangeDate) => {
      dispatch({
        type: ActionKind.YEAR_MINUS,
        payload: {
          startDate: {
            ...payload.startDate,
            day:
              cacheRangeDate?.startDate?.year === payload.startDate.year
                ? cacheRangeDate?.startDate?.day
                : 0,
          },
          endDate: nextCacheDay(payload, cacheRangeDate),
        },
      });
    },
    [cacheRangeDate],
  );
  const onRangeIncreaseMonth = useCallback(
    (payload: RangeDate) => {
      dispatch({
        type: ActionKind.MONTH_PLUS,
        payload: {
          startDate: {
            ...payload.startDate,
            day:
              cacheRangeDate?.startDate?.month === payload.startDate.month
                ? cacheRangeDate?.startDate.day
                : 0,
            year:
              payload.startDate.month === 12
                ? payload.startDate.year + 1
                : payload.startDate.year,
          },
          endDate: nextCacheMonthIncrease(payload, cacheRangeDate),
        },
      });
    },
    [cacheRangeDate],
  );
  const onRangeDecreaseMonth = useCallback(
    (payload: RangeDate) => {
      dispatch({
        type: ActionKind.MONTH_MINUS,
        payload: {
          startDate: {
            ...payload.startDate,
            day:
              cacheRangeDate?.startDate?.month === payload.startDate.month
                ? cacheRangeDate?.startDate.day
                : 0,
            year:
              payload.startDate.month === 1
                ? payload.startDate.year - 1
                : payload.startDate.year,
          },
          endDate: nextCacheMonthDecrease(payload, cacheRangeDate),
        },
      });
    },
    [cacheRangeDate],
  );

  return {
    rangeState,
    cacheRangeDate,
    onRangeDateChange,
    onRangeDaychange,
    onRangeMonthchange,
    onRangeYearchange,
    onRangeIncreaseYear,
    onRangeDecreaseYear,
    onRangeIncreaseMonth,
    onRangeDecreaseMonth,
  };
};
