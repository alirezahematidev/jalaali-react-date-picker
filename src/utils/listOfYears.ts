import moment from "moment-jalaali";
import { Year } from "../core";

export const listOfYears = (isJalaali = true, offset = 0) => {
  const dateRanges = (rule: number, sum = 0) =>
    Math.floor((isJalaali ? moment().jYear() : moment().year()) / rule) * rule +
    sum +
    offset;
  const _lowerDecade = dateRanges(10 /** => decade* */);
  const _upperDecade = dateRanges(10 /** => decade* */, 9);

  const lowerDecade = _lowerDecade > 0 ? _lowerDecade : 1;
  const upperDecade = _upperDecade > 0 ? _upperDecade : 9;

  const years: Year[] = [];
  lowerDecade - 1 > 0 &&
    years.push({ id: lowerDecade - 1, isNotCurrentDecade: true });
  for (let i = lowerDecade; i <= upperDecade; i++) {
    i > 0 && years.push({ id: i });
  }
  years.push({ id: upperDecade + 1, isNotCurrentDecade: true });
  return {
    years,
    lowerDecade,
    upperDecade,
  };
};
