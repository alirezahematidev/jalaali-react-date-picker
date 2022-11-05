import { DateTransformer } from "../types/global.types";

export enum ActionKind {
  DAY = "DAY",
  MONTH = "MONTH",
  YEAR = "YEAR",
  MONTH_PLUS = "MONTH_PLUS",
  MONTH_MINUS = "MONTH_MINUS",
  YEAR_PLUS = "YEAR_PLUS",
  YEAR_MINUS = "YEAR_MINUS",
}

export interface Action {
  type: ActionKind;
  payload: DateTransformer;
}

// Our reducer function that uses a switch statement to handle our actions
export function reducer(
  state: DateTransformer,
  action: Action,
): DateTransformer {
  const { type, payload } = action;
  switch (type) {
    case ActionKind.DAY:
      return {
        ...state,
        day: payload.day,
        month: payload.month,
      };
    case ActionKind.MONTH:
      return {
        ...state,
        month: payload.month,
        day: 0,
      };
    case ActionKind.MONTH_MINUS:
      return {
        ...state,
        month: state.month - 1 === 0 ? 12 : state.month - 1,
        day: 0,
      };
    case ActionKind.MONTH_PLUS:
      return {
        ...state,
        month: state.month + 1 === 13 ? 1 : state.month + 1,
        day: 0,
      };
    case ActionKind.YEAR:
      return {
        ...state,
        year: payload.year,
      };
    case ActionKind.YEAR_MINUS:
      return {
        ...state,
        year: state.year - 1,
      };
    case ActionKind.YEAR_PLUS:
      return {
        ...state,
        year: state.year + 1,
      };
    default:
      return state;
  }
}
