import { DatePickerProps, RangePickerProps } from "../interfaces";

export type DatePropsReducerType = Pick<
  DatePickerProps,
  "locale" | "onChange" | "value" | "disabledDates" | "format"
> & { format?: string };

export type RangePropsReducerType = Pick<
  RangePickerProps,
  "locale" | "onChange" | "value" | "disabledDates" | "format"
> & { format?: string };

export enum PropsActionKind {
  LOCALE = "LOCALE",
  ONCHANGE = "ONCHANGE",
  RANGEONCHANGE = "RANGEONCHANGE",
  VALUE = "VALUE",
  RANGEVALUE = "RANGEVALUE",
  DISABLEDDATES = "DISABLEDDATES",
  FORMAT = "FORMAT",
}

export interface Action {
  type: PropsActionKind;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

// Our reducer function that uses a switch statement to handle our actions
export function datePropsReducer(
  state: DatePropsReducerType,
  action: Action,
): DatePropsReducerType {
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
    case PropsActionKind.FORMAT:
      return {
        ...state,
        format: payload,
      };
    default:
      return state;
  }
}

export function rangePropsReducer(
  state: RangePropsReducerType,
  action: Action,
): RangePropsReducerType {
  const { type, payload } = action;
  switch (type) {
    case PropsActionKind.LOCALE:
      return {
        ...state,
        locale: payload,
      };
    case PropsActionKind.RANGEONCHANGE:
      return {
        ...state,
        onChange: payload,
      };
    case PropsActionKind.RANGEVALUE:
      return {
        ...state,
        value: payload,
      };
    case PropsActionKind.DISABLEDDATES:
      return {
        ...state,
        disabledDates: payload,
      };
    case PropsActionKind.FORMAT:
      return {
        ...state,
        format: payload,
      };
    default:
      return state;
  }
}
