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
      current: {
        day: 0,
        year: isJalaali ? value[0].jYear() : value[0].year(),
        month: Number(value[0].format(isJalaali ? "jM" : "M")),
      },
      next: {
        day: 0,
        year: isJalaali ? value[1].jYear() : value[1].year(),
        month: Number(value[1].format(isJalaali ? "jM" : "M")),
      },
    };
  }

  return {
    current: {
      day: 0,
      year: isJalaali ? moment().jYear() : moment().year(),
      month: Number(moment().format(isJalaali ? "jM" : "M")),
    },
    next: {
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
        current: {
          day: isJalaali ? valueProp[0].jDate() : valueProp[0].date(),
          year: isJalaali ? valueProp[0].jYear() : valueProp[0].year(),
          month: Number(valueProp[0].format(isJalaali ? "jM" : "M")),
        },
        next: {
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

      if (payload.next) {
        const dates = rangeTransformer({ ...payload });

        payload.current.day !== 0 &&
          payload.next.day !== 0 &&
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

      const { current, next } = payload;

      if (next) {
        current.day !== 0 &&
          next.day !== 0 &&
          onDayChangeProp?.([current.day, next.day]);
      }
    },
    [onDayChangeProp],
  );
  const onRangeMonthchange = useCallback(
    (payload: RangeDate) => {
      dispatch({ type: ActionKind.MONTH, payload });

      const { current, next } = payload;

      if (next) {
        onMonthChangeProp?.([
          {
            value: current.month,
            name: months.find((item) => item.id === current.month)?.name || "",
          },
          {
            value: next.month,
            name: months.find((item) => item.id === next.month)?.name || "",
          },
        ]);
      }
    },
    [months, onMonthChangeProp],
  );
  const onRangeYearchange = useCallback(
    (payload: RangeDate) => {
      dispatch({ type: ActionKind.YEAR, payload });

      const { current, next } = payload;

      if (next) {
        onYearChangeProp?.([current.year, next.year]);
      }
    },
    [onYearChangeProp],
  );
  const onRangeIncreaseYear = useCallback(
    (payload: RangeDate) => {
      dispatch({
        type: ActionKind.YEAR_PLUS,
        payload: {
          current: {
            ...payload.current,
            day:
              cacheRangeDate?.current?.year === payload.current.year
                ? cacheRangeDate?.current?.day
                : 0,
          },
          next: nextCacheDay(payload, cacheRangeDate),
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
          current: {
            ...payload.current,
            day:
              cacheRangeDate?.current?.year === payload.current.year
                ? cacheRangeDate?.current?.day
                : 0,
          },
          next: nextCacheDay(payload, cacheRangeDate),
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
          current: {
            ...payload.current,
            day:
              cacheRangeDate?.current?.month === payload.current.month
                ? cacheRangeDate?.current.day
                : 0,
            year:
              payload.current.month === 12
                ? payload.current.year + 1
                : payload.current.year,
          },
          next: nextCacheMonthIncrease(payload, cacheRangeDate),
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
          current: {
            ...payload.current,
            day:
              cacheRangeDate?.current?.month === payload.current.month
                ? cacheRangeDate?.current.day
                : 0,
            year:
              payload.current.month === 1
                ? payload.current.year - 1
                : payload.current.year,
          },
          next: nextCacheMonthDecrease(payload, cacheRangeDate),
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
