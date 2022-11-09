import { DatePickerProps } from "../interfaces";

export type PropsReducerType = Pick<
  DatePickerProps,
  "locale" | "onChange" | "value" | "disabledDates"
>;

export enum PropsActionKind {
  LOCALE = "LOCALE",
  ONCHANGE = "ONCHANGE",
  VALUE = "VALUE",
  DISABLEDDATES = "DISABLEDDATES",
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
    case PropsActionKind.ONCHANGE:
      return {
        ...state,
        onChange: payload,
      };
    case PropsActionKind.VALUE:
      return {
        ...state,
        value: payload,
      };
    case PropsActionKind.DISABLEDDATES:
      return {
        ...state,
        disabledDates: payload,
      };
    // case PropsActionKind.HIGHLIGHT_DAYS:
    //   return {
    //     ...state,
    //     highlightOffDays: payload,
    //   };
    default:
      return state;
  }
}
