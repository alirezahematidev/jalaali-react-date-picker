import { DatePickerProps } from "../interfaces";

export type PropsReducerType = Pick<DatePickerProps, "isJalaali">;

export enum PropsActionKind {
  ISJALAALI = "ISJALAALI",
}

export interface Action {
  type: PropsActionKind;
  payload?: any;
}

// Our reducer function that uses a switch statement to handle our actions
export function propsReducer(
  state: PropsReducerType,
  action: Action,
): PropsReducerType {
  const { type, payload } = action;
  switch (type) {
    case PropsActionKind.ISJALAALI:
      return {
        ...state,
        isJalaali: payload,
      };
    default:
      return state;
  }
}
