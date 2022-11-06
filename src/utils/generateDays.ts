import { getDaysOfJalaaliMonth, getDaysOfGregorianMonth } from ".";
import { dateTransformer } from "./dateTransformer";
import { generateNextMonthDays } from "./generateNextMonthDays";
import { generatePrevMonthDays } from "./generatePrevMonthDays";

export const generateDays = (month: number, year: number, isJalaali = true) => {
  const currentMonthDays = isJalaali
    ? getDaysOfJalaaliMonth(month, year)
    : getDaysOfGregorianMonth(month, year);

  const startOfMonthWeekDay = dateTransformer(
    {
      day: currentMonthDays[0].day,
      month,
      year,
    },
    isJalaali,
  ).weekday();

  const daysOfMonthAfterUnshift = currentMonthDays.unshift(
    ...generatePrevMonthDays({
      currentMonth: month,
      currentMonthWeekDay: startOfMonthWeekDay,
      year,
      isJalaali,
    }),
  );
  currentMonthDays.push(
    ...generateNextMonthDays({
      currentMonth: month,
      currentMonthWeekDay: 42 - daysOfMonthAfterUnshift,
      year,
      isJalaali,
    }),
  );

  return { days: currentMonthDays };
};
