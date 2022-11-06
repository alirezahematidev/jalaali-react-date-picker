import moment from "moment-jalaali";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
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
  onDaychange: () => null,
  onMonthchange: () => null,
  onYearchange: () => null,
  onIncreaseYear: () => null,
  onDecreaseYear: () => null,
  onIncreaseMonth: () => null,
  onDecreaseMonth: () => null,
  isJalaali: true,
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
  } = useDateReducer();

  const { setIsJalaali, propsState } = usePropsReducer();

  useDeepCompareEffect(() => {
    if (propsState.isJalaali !== props.isJalaali) {
      setIsJalaali(props.isJalaali);
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
        isJalaali: propsState.isJalaali,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

export const useDatePickerContext = () => {
  return useContext(DatePickerContext);
};
