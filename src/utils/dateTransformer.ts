import moment from "moment-jalaali";
import { Date } from "../core/types/global.types";

const cache = <T>(callback: (...args: any[]) => T) => {
  const cache: Record<string, T> = {};

  return (...args: any[]) => {
    const argsKey = JSON.stringify(args);

    if (!cache[argsKey]) {
      cache[argsKey] = callback(...args);
    }
    return cache[argsKey];
  };
};

export const dateTransformer = cache(
  (data: Date, isJalaali = true): moment.Moment => {
    const { day, month, year } = data;
    if (month < 1 || year < 1) {
      throw new Error("entered inputs are not valid");
    }
    const result = moment(
      `${year}-${month}-${day || 1}`,
      isJalaali ? "jYYYY-jM-jDD" : "YYYY-M-DD",
    );

    if (!result.isValid()) {
      throw new Error("entered inputs are not valid");
    }

    return result;
  },
);
