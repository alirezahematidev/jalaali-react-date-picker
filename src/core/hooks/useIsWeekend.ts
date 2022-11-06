import { dateTransformer } from "../../utils";
import { Date } from "../types/global.types";
import { useLocale } from "./useLocale";

export const useIsWeekend = () => {
  const { isPersian } = useLocale();

  function isWeekend(date: Date, isJalaali = true) {
    return dateTransformer(date, isJalaali).weekday() === (isPersian ? 6 : 2);
  }

  return { isWeekend };
};
