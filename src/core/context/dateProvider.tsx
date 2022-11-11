import { isEqual } from "lodash-es";
import moment from "moment-jalaali";
import { createContext, useContext } from "react";
import { useDeepCompareEffect } from "../hooks";
import { DatePickerProps } from "../interfaces";
import { Date } from "../types/global.types";
import { DatePropsReducerType } from "./propsReducer";
import { useDateReducer } from "./useDateReducer";
import { useDatePropsReducer } from "./usePropsReducer";

interface ContextType extends DatePropsReducerType {
  state: Date;
  cacheDate?: Date;
  onDateChange: (payload: Date) => void;
  onDaychange: (payload: Date) => void;
  onMonthchange: (payload: Date) => void;
  onYearchange: (payload: Date) => void;
  onIncreaseYear: (payload: Date) => void;
  onDecreaseYear: (payload: Date) => void;
  onIncreaseMonth: (payload: Date) => void;
  onDecreaseMonth: (payload: Date) => void;
}

export const DatePickerContext = createContext<ContextType>({
  state: {
    day: 0,
    month: 0,
    year: 0,
  },
  cacheDate: undefined,
  locale: {
    language: "fa",
  },
  onDateChange: () => null,
  onDaychange: () => null,
  onMonthchange: () => null,
  onYearchange: () => null,
  onIncreaseYear: () => null,
  onDecreaseYear: () => null,
  onIncreaseMonth: () => null,
  onDecreaseMonth: () => null,
});

export const DateProvider = ({
  children,
  props,
}: {
  children: React.ReactNode;
  props: DatePickerProps;
}) => {
  const language = props ? props.locale?.language || "fa" : "fa";

  const {
    state,
    onDaychange,
    onDateChange,
    onMonthchange,
    onYearchange,
    onIncreaseYear,
    onDecreaseYear,
    onIncreaseMonth,
    onDecreaseMonth,
    cacheDate,
  } = useDateReducer({
    language,
    onDayChangeProp: props?.onDayChange,
    onMonthChangeProp: props?.onMonthChange,
    onYearChangeProp: props?.onYearChange,
    onChangeProp: props.onChange,
    formatProp: props.format,
    valueProp: props.value,
  });

  const { setLocale, setDisabledDates, propsState } = useDatePropsReducer();

  useDeepCompareEffect(() => {
    if (props.locale && !isEqual(props.locale, propsState.locale)) {
      const isJalaali = language === "fa";
      setLocale(props.locale);
      onDaychange({
        day: 0,
        year: isJalaali ? moment().jYear() : moment().year(),
        month: Number(moment().format(isJalaali ? "jM" : "M")),
      });
    }
    if (
      props.disabledDates?.length &&
      !isEqual(props.disabledDates, propsState.disabledDates)
    ) {
      setDisabledDates(props.disabledDates);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <DatePickerContext.Provider
      value={{
        state,
        onDateChange,
        onDaychange,
        onMonthchange,
        onYearchange,
        onIncreaseYear,
        onDecreaseYear,
        onIncreaseMonth,
        onDecreaseMonth,
        cacheDate,
        ...propsState,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

export const useDatePickerContext = () => {
  if (typeof DatePickerContext === "undefined") {
    throw new Error(
      "useDatePickerContext must be under DatePickerContext Provider",
    );
  }

  return useContext(DatePickerContext);
};
