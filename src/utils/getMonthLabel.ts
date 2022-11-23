import { gregorianMonths, jalaaliMonths } from "../core/constants/datasets";

export const getMonthLabels = (month: number, isJalaali = true) => {
  const months = isJalaali ? jalaaliMonths : gregorianMonths;
  return months.find((item) => item.id === month)?.name || "";
};
