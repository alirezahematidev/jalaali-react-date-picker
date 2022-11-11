import { RangeDate } from "../types/global.types";
import {
  nextDate,
  nextMonth,
  nextMonthDecrease,
  nextMonthIncrease,
  nextYear,
  nextYearDecrease,
  nextYearIncrease,
} from "./rangeNextDate";

export enum ActionKind {
  DATE = "DATE",
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
  payload: RangeDate;
}

// Our reducer function that uses a switch statement to handle our actions
export function rangeReducer(state: RangeDate, action: Action): RangeDate {
  const { type, payload } = action;
  const { current, next } = payload;

  switch (type) {
    case ActionKind.DATE:
      return {
        current: {
          day: current.day,
          month: current.month,
          year: current.year,
        },
        next: nextDate(next, state),
      };
    case ActionKind.DAY:
      return {
        current: {
          ...state.current,
          day: current.day,
          month: current.month,
          year: current.year,
        },
        next: nextDate(next, state),
      };
    case ActionKind.MONTH:
      return {
        current: { ...state.current, month: current.month, day: 0 },
        next: nextMonth(next, state),
      };
    case ActionKind.MONTH_MINUS:
      return {
        current: {
          ...state.current,
          month: current.month - 1 === 0 ? 12 : current.month - 1,
          day: 0,
          year: current.year,
        },
        next: nextMonthDecrease(next, state),
      };
    case ActionKind.MONTH_PLUS:
      return {
        current: {
          ...state.current,
          month: current.month + 1 === 13 ? 1 : current.month + 1,
          day: 0,
          year: current.year,
        },
        next: nextMonthIncrease(next, state),
      };
    case ActionKind.YEAR:
      return {
        current: {
          ...state.current,
          year: current.year,
        },
        next: nextYear(next, state),
      };
    case ActionKind.YEAR_MINUS:
      return {
        current: {
          ...state.current,
          year: current.year - 1,
        },
        next: nextYearDecrease(next, state),
      };
    case ActionKind.YEAR_PLUS:
      return {
        current: {
          ...state.current,
          year: current.year + 1,
        },
        next: nextYearIncrease(next, state),
      };
    default:
      return state;
  }
}
