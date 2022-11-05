import { MonthKey } from "../core/types/global.types";
import { getDaysOfMonth } from "./getDaysOfMonth";

export const generatePrevMonthDays = ({
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
  console.log("currentMonthWeekDay", currentMonthWeekDay);
  const prevMonthDays = getDaysOfMonth(
    (currentMonth === 1 ? 12 : currentMonth - 1) as MonthKey,
    jYear,
  );
  return prevMonthDays
    .slice(currentMonthWeekDay === 6 ? -5 : -currentMonthWeekDay)
    .map((item) => ({ ...item, isNotCurrentMonth: true }));
};
