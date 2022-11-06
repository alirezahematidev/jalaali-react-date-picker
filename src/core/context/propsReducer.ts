import { DatePickerProps } from "../interfaces";

export type PropsReducerType = Pick<DatePickerProps, "locale">;

export enum PropsActionKind {
  // IS_JALAALI = "IS_JALAALI",
  LOCALE = "LOCALE",
}

export interface Action {
  type: PropsActionKind;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

// Our reducer function that uses a switch statement to handle our actions
export function propsReducer(
  state: PropsReducerType,
  action: Action,
): PropsReducerType {
  const { type, payload } = action;
  switch (type) {
    // case PropsActionKind.IS_JALAALI:
    //   return {
    //     ...state,
    //     isJalaali: payload,
    //   };
    case PropsActionKind.LOCALE:
      return {
        ...state,
        locale: payload,
      };
    default:
      return state;
  }
}
