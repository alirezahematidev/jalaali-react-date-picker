import { RangeDate } from "../../types/global.types";
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
  const { startDate, endDate } = payload;

  switch (type) {
    case ActionKind.DATE:
      return {
        startDate: {
          day: startDate.day,
          month: startDate.month,
          year: startDate.year,
        },
        endDate: nextDate(endDate, state),
      };
    case ActionKind.DAY:
      return {
        startDate: {
          ...state.startDate,
          day: startDate.day,
          month: startDate.month,
          year: startDate.year,
        },
        endDate: nextDate(endDate, state),
      };
    case ActionKind.MONTH:
      return {
        startDate: { ...state.startDate, month: startDate.month, day: 0 },
        endDate: nextMonth(endDate, state),
      };
    case ActionKind.MONTH_MINUS:
      return {
        startDate: {
          ...state.startDate,
          day: 0,
          month: startDate.month - 1 === 0 ? 12 : startDate.month - 1,
          year: startDate.year,
        },
        endDate: nextMonthDecrease(endDate, state),
      };
    case ActionKind.MONTH_PLUS:
      return {
        startDate: {
          ...state.startDate,
          day: 0,
          month: startDate.month + 1 === 13 ? 1 : startDate.month + 1,
          year: startDate.year,
        },
        endDate: nextMonthIncrease(endDate, state),
      };
    case ActionKind.YEAR:
      return {
        startDate: {
          ...state.startDate,
          year: startDate.year,
        },
        endDate: nextYear(endDate, state),
      };
    case ActionKind.YEAR_MINUS:
      return {
        startDate: {
          ...state.startDate,
          year: startDate.year - 1,
        },
        endDate: nextYearDecrease(endDate, state),
      };
    case ActionKind.YEAR_PLUS:
      return {
        startDate: {
          ...state.startDate,
          year: startDate.year + 1,
        },
        endDate: nextYearIncrease(endDate, state),
      };
    default:
      return state;
  }
}
