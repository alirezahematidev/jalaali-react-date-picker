import { jalaaliMonths, gregorianMonths } from "../core";

export const getMonthLabel = (month: number, isJalaali?: boolean) => {
  return isJalaali
    ? jalaaliMonths.find((item) => item.id === month)?.name
    : gregorianMonths.find((item) => item.id === month)?.name;
};
