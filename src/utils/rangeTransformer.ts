/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment-jalaali";
import { RangeDate, RangeValue } from "../core";

export const rangeTransformer = (
  data: RangeDate,
  isJalaali: boolean,
): RangeValue => {
  const { startDate, endDate } = data;

  if (startDate.day < 1 || startDate.month < 1 || startDate.year < 1) {
    throw new Error("entered inputs are not valid");
  }

  if (endDate && (endDate.day < 1 || endDate.month < 1 || endDate.year < 1)) {
    throw new Error("entered inputs are not valid");
  }

  const result: RangeValue = [
    moment(
      `${startDate.year}-${startDate.month}-${startDate.day}`,
      isJalaali ? "jYYYY-jM-jDD" : "YYYY-M-DD",
    ),
    moment(
      `${endDate?.year}-${endDate?.month}-${endDate?.day}`,
      isJalaali ? "jYYYY-jM-jDD" : "YYYY-M-DD",
    ),
  ];

  if (result.some((date) => !date?.isValid())) {
    throw new Error("entered inputs are not valid");
  }

  return result;
};
