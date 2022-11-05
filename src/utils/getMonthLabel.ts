import { jalaaliMonths } from "../core";

export const getMonthLabel = (month: number, isJalaali: boolean) => {
  const faKeys = {
    1: "فروردین",
  };
  return isJalaali
    ? jalaaliMonths.find((item) => item.id === month)?.name
    : jalaaliMonths.find((item) => item.id === month)?.name;
};
