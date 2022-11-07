import { DatePickerProps } from "../interfaces";

export type PropsReducerType = Pick<
  DatePickerProps,
  "locale" | "highlightOffDays"
>;

export enum PropsActionKind {
  LOCALE = "LOCALE",
  HIGHLIGHT_DAYS = "HIGHLIGHT_DAYS",
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
    case PropsActionKind.LOCALE:
      return {
        ...state,
        locale: payload,
      };
    case PropsActionKind.HIGHLIGHT_DAYS:
      return {
        ...state,
        highlightOffDays: payload,
      };
    default:
      return state;
  }
}
