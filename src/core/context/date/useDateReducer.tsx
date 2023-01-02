import moment, { Moment } from "moment-jalaali";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import {
  dateTransformer,
  formatGenerator,
  momentTransformer,
} from "../../../utils";
import { localizedMonth } from "../../constants";
import { DatePickerTypes } from "../../types";
import { Date, Language } from "../../types/global.types";
import { DateActionKind, reducer } from "./dateReducer";

interface DateReducerType {
  formatProp?: string;
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
  const [placeholder, setPlaceholder] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const formattedValue = useCallback(
    (value: Moment) => {
      return value.format(formatProp ? formatProp : formatGenerator(isJalaali));
    },
    [formatProp, isJalaali],
  );

  const onEmptyInputValue = () => {
    dispatch({ type: DateActionKind.DAY, payload: { ...state, day: 0 } });
    setCacheDate((c) => ({ ...c, day: 0 }));
    setInputValue("");
    setPlaceholder("");
  };

  const changePlaceholder = useCallback(
    (date: Date | null) => {
      if (!date) {
        return setPlaceholder("");
      }

      const formattedInputValue = formattedValue(
        dateTransformer(date, isJalaali),
      );
      setPlaceholder(formattedInputValue);
    },
    [formattedValue, isJalaali],
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
      dispatch({ type: DateActionKind.DATE, payload });
      setCacheDate(payload);
      const res = dateTransformer({ ...payload }, isJalaali);
      payload.day !== 0 && onChangeProp?.(res, formattedValue(res));
    },
    [isJalaali, onChangeProp, formattedValue],
  );
  const onDaychange = useCallback(
    (payload: Date) => {
      dispatch({ type: DateActionKind.DAY, payload });
      setCacheDate(payload);
      payload.day !== 0 && onDayChangeProp?.(payload.day);
      payload.day !== 0 && setInputValue("");
    },
    [onDayChangeProp],
  );
  const onMonthchange = useCallback(
    (payload: Date) => {
      dispatch({ type: DateActionKind.MONTH, payload });
      onMonthChangeProp?.({
        value: payload.month,
        name: months.find((item) => item.id === payload.month)?.name || "",
      });
    },
    [months, onMonthChangeProp],
  );
  const onYearchange = useCallback(
    (payload: Date) => {
      dispatch({ type: DateActionKind.YEAR, payload });
      onYearChangeProp?.(payload.year);
    },

    [onYearChangeProp],
  );
  const onIncreaseYear = useCallback(
    (payload: Date) => {
      dispatch({
        type: DateActionKind.YEAR_PLUS,
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
        type: DateActionKind.YEAR_MINUS,
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
        type: DateActionKind.MONTH_PLUS,
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
        type: DateActionKind.MONTH_MINUS,
        payload: {
          ...payload,
          day: cacheDate?.month === payload.month ? cacheDate.day : 0,
          year: payload.month === 1 ? payload.year - 1 : payload.year,
        },
      });
    },
    [cacheDate.day, cacheDate?.month],
  );

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userData = e.target.value;
    const momentValue = moment(userData, formatProp, true);
    if (momentValue.isValid()) {
      setInputValue(userData);
      onDateChange(momentTransformer(momentValue, isJalaali));
      onMonthchange(momentTransformer(momentValue, isJalaali));
    } else {
      setInputValue(dateTransformer(cacheDate, isJalaali).format(formatProp));
    }
  };

  const { dateValue } = useMemo(() => {
    const dateValue =
      state && state.day !== 0
        ? formattedValue(dateTransformer(state, isJalaali))
        : "";

    return { dateValue };
  }, [formattedValue, isJalaali, state]);

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
    changePlaceholder,
    onEmptyInputValue,
    inputProps: {
      value: inputValue || dateValue,
      placeholder,
      onChangeInputValue,
      onEmptyInputValue,
    },
  };
};
