import { Moment } from "moment-jalaali";
import { Date } from "../core/types/global.types";

export const momentTransformer = (moment: Moment, isJalaali = true): Date => {
  const date: Date = {
    day: isJalaali ? moment.jDate() : moment.date(),
    year: isJalaali ? moment.jYear() : moment.year(),
    month: Number(moment.format(isJalaali ? "jM" : "M")),
  };
  return date;
};
