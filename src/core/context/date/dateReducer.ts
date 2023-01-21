import { Date } from "../../types/global.types";

export enum DateActionKind {
  DATE = "DATE",
  DAY = "DAY",
  MONTH = "MONTH",
  YEAR = "YEAR",
  MONTH_PLUS = "MONTH_PLUS",
  MONTH_MINUS = "MONTH_MINUS",
  YEAR_PLUS = "YEAR_PLUS",
  YEAR_MINUS = "YEAR_MINUS",
}

export interface DateAction {
  type: DateActionKind;
  payload: Date;
}

// Our reducer function that uses a switch statement to handle our actions
export function reducer(state: Date, action: DateAction): Date {
  const { type, payload } = action;
  switch (type) {
    /** When date changes */
    case DateActionKind.DATE:
      return {
        ...state,
        day: payload.day,
        month: payload.month,
        year: payload.year,
      };

    /** When day changes */
    case DateActionKind.DAY:
      return {
        ...state,
        day: payload.day,
        month: payload.month,
        year: payload.year,
      };

    /** When month changes */
    case DateActionKind.MONTH:
      return {
        ...state,
        month: payload.month,
        day: 0,
      };

    /** When month decreases */
    case DateActionKind.MONTH_MINUS:
      return {
        ...state,
        month: payload.month - 1 === 0 ? 12 : payload.month - 1,
        day: 0,
        year: payload.year,
      };

    /** When month increases */
    case DateActionKind.MONTH_PLUS:
      return {
        ...state,
        month: payload.month + 1 === 13 ? 1 : payload.month + 1,
        day: 0,
        year: payload.year,
      };

    /** When year changes */
    case DateActionKind.YEAR:
      return {
        ...payload,
        year: payload.year,
      };

    /** When year decreases */
    case DateActionKind.YEAR_MINUS:
      return {
        ...payload,
        year: payload.year - 1,
      };

    /** When year increases */
    case DateActionKind.YEAR_PLUS:
      return {
        ...payload,
        year: payload.year + 1,
      };
    default:
      return state;
  }
}
