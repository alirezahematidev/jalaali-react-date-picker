import moment, { Moment } from "moment-jalaali";
import { useState, useReducer, useEffect, useCallback } from "react";
import { dateTransformer } from "../../utils";
import { formatGenerator } from "../../utils/formatGenerator";
import { momentTransformer } from "../../utils/momentTransformer";
import { localizedMonth } from "../constants";
import { DatePickerTypes } from "../types";
import { Date, Language } from "../types/global.types";
import { reducer, ActionKind } from "./dateReducer";

interface DateReducerType {
  formatProp?: DatePickerTypes.Format;
  onChangeProp?: DatePickerTypes.OnChange;
  valueProp?: DatePickerTypes.Value;
  defaultValueProp?: DatePickerTypes.Value;
  onDayChangeProp?: DatePickerTypes.OnDayChange;
  onMonthChangeProp?: DatePickerTypes.OnMonthChange;
  onYearChangeProp?: DatePickerTypes.OnYearChange;
  language: Language;
}

const getDefaultValue = (value: Moment, isJalaali: boolean) => {
  return {
    day: 0,
    year: isJalaali ? value.jYear() : value.year(),
    month: Number(value.format(isJalaali ? "jM" : "M")),
  };
};

export const useDateReducer = ({
  formatProp,
  valueProp,
  defaultValueProp,
  onChangeProp,
  onDayChangeProp,
  onMonthChangeProp,
  onYearChangeProp,
  language,
}: DateReducerType) => {
  const isJalaali = language === "fa";
  const months = localizedMonth[language];
  const [cacheDate, setCacheDate] = useState<Date>(
    getDefaultValue(defaultValueProp || moment(), isJalaali),
  );
  const [state, dispatch] = useReducer(
    reducer,
    getDefaultValue(defaultValueProp || moment(), isJalaali),
  );

  useEffect(() => {
    if (valueProp) {
      const value = momentTransformer(valueProp, isJalaali);
      setCacheDate(value);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueProp]);

  const onDateChange = useCallback(
    (payload: Date) => {
      dispatch({ type: ActionKind.DATE, payload });
      setCacheDate(payload);
      const res = dateTransformer({ ...payload });
      payload.day !== 0 &&
        onChangeProp?.(
          res,
          res.format(
            formatProp
              ? typeof formatProp === "function"
                ? formatProp(res)
                : formatProp
              : formatGenerator(isJalaali),
          ),
        );
    },
    [formatProp, isJalaali, onChangeProp],
  );
  const onDaychange = useCallback(
    (payload: Date) => {
      dispatch({ type: ActionKind.DAY, payload });
      setCacheDate(payload);
      payload.day !== 0 && onDayChangeProp?.(payload.day);
    },
    [onDayChangeProp],
  );
  const onMonthchange = useCallback(
    (payload: Date) => {
      dispatch({ type: ActionKind.MONTH, payload });
      onMonthChangeProp?.({
        value: payload.month,
        name: months.find((item) => item.id === payload.month)?.name || "",
      });
    },
    [months, onMonthChangeProp],
  );
  const onYearchange = useCallback(
    (payload: Date) => {
      dispatch({ type: ActionKind.YEAR, payload });
      onYearChangeProp?.(payload.year);
    },
    [onYearChangeProp],
  );
  const onIncreaseYear = useCallback(
    (payload: Date) => {
      dispatch({
        type: ActionKind.YEAR_PLUS,
        payload: {
          ...payload,
          day: cacheDate?.year === payload.year ? cacheDate.day : 0,
        },
      });
    },
    [cacheDate.day, cacheDate?.year],
  );
  const onDecreaseYear = useCallback(
    (payload: Date) => {
      dispatch({
        type: ActionKind.YEAR_MINUS,
        payload: {
          ...payload,
          day: cacheDate?.year === payload.year ? cacheDate.day : 0,
        },
      });
    },
    [cacheDate.day, cacheDate?.year],
  );
  const onIncreaseMonth = useCallback(
    (payload: Date) => {
      dispatch({
        type: ActionKind.MONTH_PLUS,
        payload: {
          ...payload,
          day: cacheDate?.month === payload.month ? cacheDate.day : 0,
          year: payload.month === 12 ? payload.year + 1 : payload.year,
        },
      });
    },
    [cacheDate.day, cacheDate?.month],
  );
  const onDecreaseMonth = useCallback(
    (payload: Date) => {
      dispatch({
        type: ActionKind.MONTH_MINUS,
        payload: {
          ...payload,
          day: cacheDate?.month === payload.month ? cacheDate.day : 0,
          year: payload.month === 1 ? payload.year - 1 : payload.year,
        },
      });
    },
    [cacheDate.day, cacheDate?.month],
  );

  return {
    state,
    cacheDate,
    onDateChange,
    onDaychange,
    onMonthchange,
    onYearchange,
    onIncreaseYear,
    onDecreaseYear,
    onIncreaseMonth,
    onDecreaseMonth,
  };
};
