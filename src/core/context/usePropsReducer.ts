import { useReducer } from "react";
import { DatePickerProps, RangePickerProps } from "../interfaces";
import {
  datePropsReducer,
  PropsActionKind,
  rangePropsReducer,
} from "./propsReducer";

export const useDatePropsReducer = () => {
  const [propsState, dispatch] = useReducer(datePropsReducer, {
    locale: "fa",
  });

  const setLocale = (payload?: DatePickerProps["locale"]) => {
    dispatch({ type: PropsActionKind.LOCALE, payload });
  };
  const setDisabledDates = (payload?: DatePickerProps["disabledDates"]) => {
    dispatch({ type: PropsActionKind.DISABLEDDATES, payload });
  };
  const setFormat = (payload?: DatePickerProps["format"]) => {
    dispatch({ type: PropsActionKind.FORMAT, payload });
  };

  return {
    setLocale,
    setDisabledDates,
    setFormat,
    propsState,
  };
};

export const useRangePropsReducer = () => {
  const [propsState, dispatch] = useReducer(rangePropsReducer, {
    locale: "fa",
  });

  const setLocale = (payload?: DatePickerProps["locale"]) => {
    dispatch({ type: PropsActionKind.LOCALE, payload });
  };
  const setRangeDisabledDates = (
    payload?: RangePickerProps["disabledDates"],
  ) => {
    dispatch({ type: PropsActionKind.DISABLEDDATES, payload });
  };
  const setFormat = (payload?: DatePickerProps["format"]) => {
    dispatch({ type: PropsActionKind.FORMAT, payload });
  };
  return {
    setLocale,
    setRangeDisabledDates,
    setFormat,
    propsState,
  };
};
