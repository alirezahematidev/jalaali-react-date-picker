import moment, { Moment } from "moment-jalaali";
import { useState, useReducer, useEffect } from "react";
import { dateTransformer } from "../../utils";
import { formatGenerator } from "../../utils/formatGenerator";
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
      const value = {
        day: isJalaali ? valueProp.jDate() : valueProp.date(),
        year: isJalaali ? valueProp.jYear() : valueProp.year(),
        month: Number(valueProp.format(isJalaali ? "jM" : "M")),
      };
      setCacheDate(value);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueProp]);

  const onDateChange = (payload: Date) => {
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
  };
  const onDaychange = (payload: Date) => {
    dispatch({ type: ActionKind.DAY, payload });
    setCacheDate(payload);
    payload.day !== 0 && onDayChangeProp?.(payload.day);
  };
  const onMonthchange = (payload: Date) => {
    dispatch({ type: ActionKind.MONTH, payload });
    onMonthChangeProp?.({
      value: payload.month,
      name: months.find((item) => item.id === payload.month)?.name || "",
    });
  };
  const onYearchange = (payload: Date) => {
    dispatch({ type: ActionKind.YEAR, payload });
    onYearChangeProp?.(payload.year);
  };
  const onIncreaseYear = (payload: Date) => {
    dispatch({
      type: ActionKind.YEAR_PLUS,
      payload: {
        ...payload,
        day: cacheDate?.year === payload.year ? cacheDate.day : 0,
      },
    });
  };
  const onDecreaseYear = (payload: Date) => {
    dispatch({
      type: ActionKind.YEAR_MINUS,
      payload: {
        ...payload,
        day: cacheDate?.year === payload.year ? cacheDate.day : 0,
      },
    });
  };
  const onIncreaseMonth = (payload: Date) => {
    dispatch({
      type: ActionKind.MONTH_PLUS,
      payload: {
        ...payload,
        day: cacheDate?.month === payload.month ? cacheDate.day : 0,
        year: payload.month === 12 ? payload.year + 1 : payload.year,
      },
    });
  };
  const onDecreaseMonth = (payload: Date) => {
    dispatch({
      type: ActionKind.MONTH_MINUS,
      payload: {
        ...payload,
        day: cacheDate?.month === payload.month ? cacheDate.day : 0,
        year: payload.month === 1 ? payload.year - 1 : payload.year,
      },
    });
  };

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
