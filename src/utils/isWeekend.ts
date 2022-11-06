import { Date } from "../core/types/global.types";
import { dateTransformer } from "./dateTransformer";

export const isWeekend = (date: Date, isJalaali = true): boolean => {
  return dateTransformer(date, isJalaali).weekday() === (isJalaali ? 6 : 0);
};
