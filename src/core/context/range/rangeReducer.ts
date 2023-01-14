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

export enum RangeActionKind {
  DATE = "DATE",
  DAY = "DAY",
  MONTH = "MONTH",
  YEAR = "YEAR",
  MONTH_PLUS = "MONTH_PLUS",
  MONTH_MINUS = "MONTH_MINUS",
  YEAR_PLUS = "YEAR_PLUS",
  YEAR_MINUS = "YEAR_MINUS",
}

export interface RangeAction {
  type: RangeActionKind;
  payload: RangeDate;
}

// Our reducer function that uses a switch statement to handle our actions
export function rangeReducer(state: RangeDate, action: RangeAction): RangeDate {
  const { type, payload } = action;
  const { startDate, endDate } = payload;

  switch (type) {
    case RangeActionKind.DATE:
      return {
        startDate: {
          day: startDate.day,
          month: startDate.month,
          year: startDate.year,
        },
        endDate: nextDate(endDate, state),
      };
    case RangeActionKind.DAY:
      return {
        startDate: {
          ...state.startDate,
          day: startDate.day,
          month: startDate.month,
          year: startDate.year,
        },
        endDate: nextDate(endDate, state),
      };
    case RangeActionKind.MONTH:
      return {
        startDate: { ...state.startDate, month: startDate.month, day: 0 },
        endDate: nextMonth(endDate, state),
      };
    case RangeActionKind.MONTH_MINUS:
      return {
        startDate: {
          ...state.startDate,
          day: 0,
          month: startDate.month === 1 ? 12 : startDate.month - 1,
          year: startDate.year,
        },
        endDate: nextMonthDecrease(endDate, state),
      };
    case RangeActionKind.MONTH_PLUS:
      return {
        startDate: {
          ...state.startDate,
          day: 0,
          month: startDate.month === 12 ? 1 : startDate.month + 1,
          year: startDate.year,
        },
        endDate: nextMonthIncrease(endDate, state),
      };
    case RangeActionKind.YEAR:
      return {
        startDate: {
          ...state.startDate,
          year: startDate.year,
        },
        endDate: nextYear(endDate, state),
      };
    case RangeActionKind.YEAR_MINUS:
      return {
        startDate: {
          ...state.startDate,
          year: startDate.year - 1,
        },
        endDate: nextYearDecrease(endDate, state),
      };
    case RangeActionKind.YEAR_PLUS:
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
