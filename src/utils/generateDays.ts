import { getDaysOfGregorianMonth, getDaysOfJalaaliMonth } from ".";
import { DatePickerProps } from "../core";
import { dateTransformer } from "./dateTransformer";
import { generateNextMonthDays } from "./generateNextMonthDays";
import { generatePrevMonthDays } from "./generatePrevMonthDays";

export const generateDays = (
  month: number,
  year: number,
  isJalaali = true,
  disabledDates: DatePickerProps["disabledDates"],
) => {
  const currentMonthDays = isJalaali
    ? getDaysOfJalaaliMonth(month, year, disabledDates)
    : getDaysOfGregorianMonth(month, year, disabledDates);

  const firstDay = dateTransformer(
    {
      day: currentMonthDays[0].day,
      month,
      year,
    },
    isJalaali,
  );

  const startOfMonthWeekDay = isJalaali
    ? firstDay.weekday()
    : firstDay.isoWeekday();

  const daysOfMonthAfterUnshift = currentMonthDays.unshift(
    ...generatePrevMonthDays({
      currentMonth: month,
      currentMonthWeekDay: startOfMonthWeekDay,
      year,
      isJalaali,
      disabledDates,
    }),
  );
  currentMonthDays.push(
    ...generateNextMonthDays({
      currentMonth: month,
      currentMonthWeekDay: 42 - daysOfMonthAfterUnshift,
      year,
      isJalaali,
      disabledDates,
    }),
  );

  return { days: currentMonthDays };
};
