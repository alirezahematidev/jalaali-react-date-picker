import { useReducer } from "react";
import { PropsActionKind, propsReducer } from "./propsReducer";

export const usePropsReducer = () => {
  const [propsState, dispatch] = useReducer(propsReducer, {
    isJalaali: true,
  });

  const setIsJalaali = (payload?: boolean) => {
    dispatch({ type: PropsActionKind.ISJALAALI, payload });
  };

  return {
    setIsJalaali,
    propsState,
  };
};
