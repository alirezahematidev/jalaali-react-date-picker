import { isEqual } from "lodash-es";
import moment from "moment-jalaali";
import { createContext, useContext } from "react";
import { useDeepCompareEffect } from "../hooks";
import { DatePickerProps } from "../interfaces";
import { Date } from "../types/global.types";
import { PropsReducerType } from "./propsReducer";
import { useDateReducer } from "./useDateReducer";
import { usePropsReducer } from "./usePropsReducer";

interface ContextType extends PropsReducerType {
  state: Date;
  cacheDate?: Date;
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
  highlightOffDays: {
    customDates: [],
    weekend: true,
  },
  onDaychange: () => null,
  onMonthchange: () => null,
  onYearchange: () => null,
  onIncreaseYear: () => null,
  onDecreaseYear: () => null,
  onIncreaseMonth: () => null,
  onDecreaseMonth: () => null,
});

export const Provider = ({
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
    onMonthchange,
    onYearchange,
    onIncreaseYear,
    onDecreaseYear,
    onIncreaseMonth,
    onDecreaseMonth,
    cacheDate,
  } = useDateReducer(language === "fa");

  const { setLocale, setHighlightDays, propsState } = usePropsReducer();

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
      props.highlightOffDays &&
      !isEqual(props.highlightOffDays, propsState.highlightOffDays)
    ) {
      setHighlightDays(props.highlightOffDays);
    } else {
      setHighlightDays(undefined);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <DatePickerContext.Provider
      value={{
        state,
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
