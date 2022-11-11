import { Date, RangeDate } from "../types/global.types";

function nextDate(date: Date | null, state: RangeDate): Date | null {
  const nextDefault = { day: 0, month: 0, year: 0 };
  if (date) {
    return {
      ...(state.next ? state.next : nextDefault),
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
      ...(state.next ? state.next : nextDefault),
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
      ...(state.next ? state.next : nextDefault),
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
      ...(state.next ? state.next : nextDefault),
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
      ...(state.next ? state.next : nextDefault),
      year: date.year,
    };
  }
  return null;
}

function nextYearDecrease(date: Date | null, state: RangeDate): Date | null {
  const nextDefault = { day: 0, month: 0, year: 0 };
  if (date) {
    return {
      ...(state.next ? state.next : nextDefault),
      year: date.year - 1,
    };
  }
  return null;
}

function nextYearIncrease(date: Date | null, state: RangeDate): Date | null {
  const nextDefault = { day: 0, month: 0, year: 0 };
  if (date) {
    return {
      ...(state.next ? state.next : nextDefault),
      year: date.year + 1,
    };
  }
  return null;
}

function nextCacheDay(payload: RangeDate, cache: RangeDate): Date | null {
  if (payload.next) {
    return {
      ...payload.next,
      day: cache?.next?.year === payload?.next.year ? cache?.next?.day : 0,
    };
  }

  return null;
}

function nextCacheMonthIncrease(
  payload: RangeDate,
  cache: RangeDate,
): Date | null {
  if (payload.next) {
    return {
      ...payload.next,
      day: cache?.next?.month === payload.next.month ? cache?.next.day : 0,
      year:
        payload.next.month === 12 ? payload.next.year + 1 : payload.next.year,
    };
  }

  return null;
}

function nextCacheMonthDecrease(
  payload: RangeDate,
  cache: RangeDate,
): Date | null {
  if (payload.next) {
    return {
      ...payload.next,
      day: cache?.next?.month === payload.next.month ? cache?.next.day : 0,
      year:
        payload.next.month === 1 ? payload.next.year - 1 : payload.next.year,
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
