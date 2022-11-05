import { getDaysOfMonth } from ".";
import { MonthKey } from "../core/types/global.types";
import { dateTransformer } from "./dateTransformer";
import { generateNextMonthDays } from "./generateNextMonthDays";
import { generatePrevMonthDays } from "./generatePrevMonthDays";

export const generateDays = (monthId: MonthKey, jYear: number) => {
  const currentMonthDays = getDaysOfMonth(monthId, jYear);
  const currentMonthWeekDay = dateTransformer(
    {
      day: currentMonthDays[0].day,
      month: monthId,
      year: jYear,
    },
    true,
  ).weekday();

  currentMonthDays.unshift(
    ...generatePrevMonthDays({
      currentMonth: monthId,
      currentMonthWeekDay,
      jYear,
    }),
  );
  currentMonthDays.push(
    ...generateNextMonthDays({
      currentMonth: monthId,
      currentMonthWeekDay: 35 - currentMonthDays.length,
      jYear,
    }),
  );

  return { days: currentMonthDays };
};
