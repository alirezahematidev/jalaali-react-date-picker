import { getDaysOfMonth } from "./getDaysOfMonth";

export const generatePrevMonthDays = ({
  currentMonthWeekDay,
  currentMonth,
  year,
}: {
  currentMonthWeekDay: number;
  currentMonth: number;
  year: number;
}) => {
  if (currentMonthWeekDay === 0) {
    return [];
  }
  const prevMonthDays = getDaysOfMonth(
    currentMonth === 1 ? 12 : currentMonth - 1,
    currentMonth === 1 ? year - 1 : year,
  );
  return prevMonthDays
    .slice(-currentMonthWeekDay)
    .map((item) => ({ ...item, isNotCurrentMonth: true }));
};
