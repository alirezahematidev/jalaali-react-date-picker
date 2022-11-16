import { useReducer } from "react";
import { DatePickerProps, RangePickerProps } from "../interfaces";
import {
  datePropsReducer,
  PropsActionKind,
  rangePropsReducer,
} from "./propsReducer";

export const useDatePropsReducer = () => {
  const [propsState, dispatch] = useReducer(datePropsReducer, {
    locale: {
      language: "fa",
    },
  });

  const setLocale = (payload?: DatePickerProps["locale"]) => {
    dispatch({ type: PropsActionKind.LOCALE, payload });
  };
  const setDisabledDates = (payload?: DatePickerProps["disabledDates"]) => {
    dispatch({ type: PropsActionKind.DISABLEDDATES, payload });
  };

  return {
    setLocale,
    setDisabledDates,
    propsState,
  };
};

export const useRangePropsReducer = () => {
  const [propsState, dispatch] = useReducer(rangePropsReducer, {
    locale: {
      language: "fa",
    },
  });

  const setLocale = (payload?: DatePickerProps["locale"]) => {
    dispatch({ type: PropsActionKind.LOCALE, payload });
  };
  const setRangeDisabledDates = (
    payload?: RangePickerProps["disabledDates"],
  ) => {
    dispatch({ type: PropsActionKind.DISABLEDDATES, payload });
  };

  return {
    setLocale,
    setRangeDisabledDates,
    propsState,
  };
};
