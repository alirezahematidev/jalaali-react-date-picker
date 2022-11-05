import { jIsLeapYear } from "moment-jalaali";
import { dayModelGenerator } from ".";
import { jalaaliMonths } from "../core/constants";
import { MonthKey } from "../core/types/global.types";

export const getDaysOfMonth = (monthId: MonthKey, jYear: number) => {
  const isLeapYear = jIsLeapYear(jYear);

  if (monthId === 12) {
    if (isLeapYear) {
      return dayModelGenerator(30, monthId);
    }
    return dayModelGenerator(29, monthId);
  }

  if (jalaaliMonths.findIndex(({ id }) => id === monthId) <= 5) {
    return dayModelGenerator(31, monthId);
  }

  return dayModelGenerator(30, monthId);
};
