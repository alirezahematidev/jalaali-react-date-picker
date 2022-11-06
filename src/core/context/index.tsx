import { isEqual } from "lodash-es";
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

const DatePickerContext = createContext<ContextType>({
  state: {
    day: 0,
    month: 0,
    year: 0,
  },
  cacheDate: undefined,
  isJalaali: true,
  locale: {
    language: "fa",
    zone: undefined,
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
  } = useDateReducer(!!props.isJalaali);

  const { setIsJalaali, setLocale, propsState } = usePropsReducer();

  useDeepCompareEffect(() => {
    if (propsState.isJalaali !== props.isJalaali) {
      if (props.locale?.language && props.locale?.language !== "fa") {
        setIsJalaali(false);
        return;
      }
      setIsJalaali(props.isJalaali);
    }

    if (props.locale && !isEqual(props.locale, propsState.locale)) {
      if (props.locale?.language !== "fa") {
        setIsJalaali(false);
      }
      setLocale(props.locale);
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
