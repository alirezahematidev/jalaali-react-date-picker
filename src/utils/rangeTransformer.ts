/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment-jalaali";
import { RangeDate, RangeValue } from "../core/types/global.types";

export const rangeTransformer = (
  data: RangeDate,
  isJalaali = true,
): RangeValue => {
  const { current, next } = data;

  if (current.day < 1 || current.month < 1 || current.year < 1) {
    throw new Error("entered inputs are not valid");
  }

  if (next && (next.day < 1 || next.month < 1 || next.year < 1)) {
    throw new Error("entered inputs are not valid");
  }

  const result: RangeValue = [
    moment(
      `${current.year}-${current.month}-${current.day}`,
      isJalaali ? "jYYYY-jM-jDD" : "YYYY-M-DD",
    ),
    moment(
      `${next?.year}-${next?.month}-${next?.day}`,
      isJalaali ? "jYYYY-jM-jDD" : "YYYY-M-DD",
    ),
  ];

  if (result.some((date) => !date.isValid())) {
    throw new Error("entered inputs are not valid");
  }

  return result;
};
