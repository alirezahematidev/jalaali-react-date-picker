import { Date, RangeDate } from "../../types/global.types";

function nextDate(date: Date | null, state: RangeDate): Date | null {
  const nextDefault = { day: 0, month: 0, year: 0 };
  if (date) {
    return {
      ...(state.endDate ? state.endDate : nextDefault),
      day: date.day,
      month: date.month,
      year: date.year,
    };
  }
  return null;
}

function nextMonth(date: Date | null, state: RangeDate): Date | null {
  const nextDefault = { day: 0, month: 0, year: 0 };

  if (date) {
    return {
      ...(state.endDate ? state.endDate : nextDefault),
      month: date.month,
      day: 0,
    };
  }
  return null;
}

function nextMonthDecrease(date: Date | null, state: RangeDate): Date | null {
  const nextDefault = { day: 0, month: 0, year: 0 };
  if (date) {
    return {
      ...(state.endDate ? state.endDate : nextDefault),
      month: date.month - 1 === 0 ? 12 : date.month - 1,
      year: date.year,
      day: 0,
    };
  }
  return null;
}

function nextMonthIncrease(date: Date | null, state: RangeDate): Date | null {
  const nextDefault = { day: 0, month: 0, year: 0 };
  if (date) {
    return {
      ...(state.endDate ? state.endDate : nextDefault),
      month: date.month + 1 === 13 ? 1 : date.month + 1,
      day: 0,
      year: date.year,
    };
  }
  return null;
}

function nextYear(date: Date | null, state: RangeDate): Date | null {
  const nextDefault = { day: 0, month: 0, year: 0 };
  if (date) {
    return {
      ...(state.endDate ? state.endDate : nextDefault),
      year: date.year,
    };
  }
  return null;
}

function nextYearDecrease(date: Date | null, state: RangeDate): Date | null {
  const nextDefault = { day: 0, month: 0, year: 0 };
  if (date) {
    return {
      ...(state.endDate ? state.endDate : nextDefault),
      year: date.year - 1,
    };
  }
  return null;
}

function nextYearIncrease(date: Date | null, state: RangeDate): Date | null {
  const nextDefault = { day: 0, month: 0, year: 0 };
  if (date) {
    return {
      ...(state.endDate ? state.endDate : nextDefault),
      year: date.year + 1,
    };
  }
  return null;
}

function nextCacheDay(payload: RangeDate, cache: RangeDate): Date | null {
  if (payload.endDate) {
    return {
      ...payload.endDate,
      day:
        cache?.endDate?.year === payload?.endDate.year
          ? cache?.endDate?.day
          : 0,
    };
  }

  return null;
}

function nextCacheMonthIncrease(
  payload: RangeDate,
  cache: RangeDate,
): Date | null {
  if (payload.endDate) {
    return {
      ...payload.endDate,
      day:
        cache?.endDate?.month === payload.endDate.month
          ? cache?.endDate.day
          : 0,
      year:
        payload.endDate.month === 12
          ? payload.endDate.year + 1
          : payload.endDate.year,
    };
  }

  return null;
}

function nextCacheMonthDecrease(
  payload: RangeDate,
  cache: RangeDate,
): Date | null {
  if (payload.endDate) {
    return {
      ...payload.endDate,
      day:
        cache?.endDate?.month === payload.endDate.month
          ? cache?.endDate.day
          : 0,
      year:
        payload.endDate.month === 1
          ? payload.endDate.year - 1
          : payload.endDate.year,
    };
  }

  return null;
}

export {
  nextDate,
  nextMonth,
  nextMonthDecrease,
  nextMonthIncrease,
  nextYear,
  nextYearDecrease,
  nextYearIncrease,
  nextCacheDay,
  nextCacheMonthIncrease,
  nextCacheMonthDecrease,
};
