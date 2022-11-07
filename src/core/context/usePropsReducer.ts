import { useReducer } from "react";
import { DatePickerProps } from "../interfaces";
import { PropsActionKind, propsReducer } from "./propsReducer";

export const usePropsReducer = () => {
  const [propsState, dispatch] = useReducer(propsReducer, {
    locale: {
      language: "fa",
    },
    highlightDays: { customDates: [], weekend: true },
  });

  const setLocale = (payload?: DatePickerProps["locale"]) => {
    dispatch({ type: PropsActionKind.LOCALE, payload });
  };

  const setHighlightDays = (payload?: DatePickerProps["highlightDays"]) => {
    dispatch({ type: PropsActionKind.HIGHLIGHT_DAYS, payload });
  };

  return {
    setLocale,
    setHighlightDays,
    propsState,
  };
};
