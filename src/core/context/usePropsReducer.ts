import { useReducer } from "react";
import { DatePickerProps } from "../interfaces";
import { PropsActionKind, propsReducer } from "./propsReducer";

export const usePropsReducer = () => {
  const [propsState, dispatch] = useReducer(propsReducer, {
    // isJalaali: true,
    locale: {
      language: "fa",
      zone: undefined,
    },
  });

  // const setIsJalaali = (payload?: DatePickerProps["isJalaali"]) => {
  //   dispatch({ type: PropsActionKind.IS_JALAALI, payload });
  // };

  const setLocale = (payload?: DatePickerProps["locale"]) => {
    dispatch({ type: PropsActionKind.LOCALE, payload });
  };

  return {
    // setIsJalaali,
    setLocale,
    propsState,
  };
};
