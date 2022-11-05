import { MonthKey } from "../core/types/global.types";
import { getDaysOfMonth } from "./getDaysOfMonth";

export const generateNextMonthDays = ({
  currentMonthWeekDay,
  currentMonth,
  jYear,
}: {
  currentMonthWeekDay: number;
  currentMonth: MonthKey;
  jYear: number;
}) => {
  if (currentMonthWeekDay === 0) {
    return [];
  }

  const nextMonthDays = getDaysOfMonth(
    (currentMonth === 12 ? 1 : currentMonth + 1) as MonthKey,
    jYear,
  );

  return nextMonthDays
    .slice(0, currentMonthWeekDay)
    .map((item) => ({ ...item, isNotCurrentMonth: true }));
};
