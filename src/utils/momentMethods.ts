import { Date, DateMetadata } from "../core";
import { dateTransformer } from "./dateTransformer";

export function checkDates(a: Date | null, b: DateMetadata) {
  if (!a) {
    return false;
  }
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

export const checkAfter = (start: Date, current: Date, isJalaali: boolean) => {
  return dateTransformer({ ...current }, isJalaali).isAfter(
    dateTransformer({ ...start }, isJalaali),
  );
};
export const checkBefore = (end: Date, current: Date, isJalaali: boolean) => {
  return dateTransformer({ ...current }, isJalaali).isBefore(
    dateTransformer({ ...end }, isJalaali),
  );
};

export function isBetweenHighlight(
  day: Date,
  startDate: Date | null,
  endDate: Date | null,
  isJalaali: boolean,
) {
  if (!startDate || !endDate || startDate.day === 0 || endDate?.day === 0)
    return false;

  return (
    checkAfter(startDate, day, isJalaali) &&
    checkBefore(endDate, day, isJalaali)
  );
}
