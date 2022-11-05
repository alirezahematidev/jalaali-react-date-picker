import { jIsLeapYear } from "moment-jalaali";
import { dayModelGenerator } from ".";
import { jalaaliMonths } from "../core/constants";

export const getDaysOfMonth = (month: number, jYear: number) => {
  const isLeapYear = jIsLeapYear(jYear);

  if (month === 12) {
    if (isLeapYear) {
      return dayModelGenerator(30, month, jYear);
    }
    return dayModelGenerator(29, month, jYear);
  }

  if (jalaaliMonths.findIndex(({ id }) => id === month) <= 5) {
    return dayModelGenerator(31, month, jYear);
  }

  return dayModelGenerator(30, month, jYear);
};
