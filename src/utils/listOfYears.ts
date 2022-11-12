import moment from "moment-jalaali";
import { Year } from "../core/types/global.types";

export const listOfYears = (isJalaali = true, offset = 0) => {
  const dateRanges = (rule: number, sum = 0) =>
    Math.floor((isJalaali ? moment().jYear() : moment().year()) / rule) * rule +
    sum +
    offset;
  const lowerDecade = dateRanges(10 /** => decade* */);
  const upperDecade = dateRanges(10 /** => decade* */, 9);

  const years: Year[] = [];
  years.push({ id: lowerDecade - 1, isNotCurrentDecade: true });
  for (let i = lowerDecade; i <= upperDecade; i++) {
    years.push({ id: i });
  }
  years.push({ id: upperDecade + 1, isNotCurrentDecade: true });
  return {
    years,
    lowerDecade,
    upperDecade,
  };
};
