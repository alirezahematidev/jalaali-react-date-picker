import { jIsLeapYear } from "moment-jalaali";
import { dayModelGenerator } from ".";
import { useLocale } from "../core";

export const getDaysOfMonth = (month: number, jYear: number) => {
  const isLeapYear = jIsLeapYear(jYear);
  const { months } = useLocale();

  if (month === 12) {
    if (isLeapYear) {
      return dayModelGenerator(30, month, jYear);
    }
    return dayModelGenerator(29, month, jYear);
  }

  if (months.findIndex(({ id }) => id === month) <= 5) {
    return dayModelGenerator(31, month, jYear);
  }

  return dayModelGenerator(30, month, jYear);
};
