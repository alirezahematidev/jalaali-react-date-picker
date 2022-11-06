import { getDaysOfMonth } from ".";
import { dateTransformer } from "./dateTransformer";
import { generateNextMonthDays } from "./generateNextMonthDays";
import { generatePrevMonthDays } from "./generatePrevMonthDays";

export const generateDays = (month: number, year: number) => {
  const currentMonthDays = getDaysOfMonth(month, year);

  const startOfMonthWeekDay = dateTransformer(
    {
      day: currentMonthDays[0].day,
      month,
      year,
    },
    true,
  ).weekday();

  const daysOfMonthAfterUnshift = currentMonthDays.unshift(
    ...generatePrevMonthDays({
      currentMonth: month,
      currentMonthWeekDay: startOfMonthWeekDay,
      year,
    }),
  );
  currentMonthDays.push(
    ...generateNextMonthDays({
      currentMonth: month,
      currentMonthWeekDay: 42 - daysOfMonthAfterUnshift,
      year,
    }),
  );

  return { days: currentMonthDays };
};
