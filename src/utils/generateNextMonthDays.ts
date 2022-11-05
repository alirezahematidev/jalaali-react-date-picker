import { getDaysOfMonth } from "./getDaysOfMonth";

export const generateNextMonthDays = ({
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

  const nextMonthDays = getDaysOfMonth(
    currentMonth === 12 ? 1 : currentMonth + 1,
    currentMonth === 12 ? year + 1 : year,
  );

  return nextMonthDays
    .slice(0, currentMonthWeekDay)
    .map((item) => ({ ...item, isNotCurrentMonth: true }));
};
