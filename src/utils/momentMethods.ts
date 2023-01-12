import moment, { Moment } from "moment-jalaali";
import { Date, DateMetadata } from "../core";
import { dateTransformer } from "./dateTransformer";

/** Check if two date is equals */
function checkDates(a: Date | null, b: DateMetadata) {
  if (!a) {
    return false;
  }
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

/** This function checks current date is after selected start date or not */
const checkAfter = (start: Date, current: Date, isJalaali: boolean) => {
  return dateTransformer({ ...current }, isJalaali).isAfter(
    dateTransformer({ ...start }, isJalaali),
  );
};

/** This function checks current date is before selected start date or not */
const checkBefore = (end: Date, current: Date, isJalaali: boolean) => {
  return dateTransformer({ ...current }, isJalaali).isBefore(
    dateTransformer({ ...end }, isJalaali),
  );
};

/** This function checks current date is between selected start date and end date or not */
function isBetweenHighlight(
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

/** Get current date year */
function getCurrentYear(isJalaali?: boolean) {
  return isJalaali ? moment().jYear() : moment().year();
}

/** Get current date month */
function getCurrentMonth(isJalaali?: boolean) {
  return Number(moment().format(isJalaali ? "jM" : "M"));
}

/** Get current date day */
function getCurrentDay(isJalaali?: boolean) {
  return isJalaali ? moment().jDate() : moment().date();
}

function getDateYear(date: Moment, isJalaali?: boolean) {
  return isJalaali ? date.jYear() : date.year();
}
function getDateMonth(date: Moment, isJalaali?: boolean) {
  return Number(date.format(isJalaali ? "jM" : "M"));
}
function getDateDay(date: Moment, isJalaali?: boolean) {
  return isJalaali ? date.jDate() : date.date();
}

export {
  checkDates,
  checkAfter,
  checkBefore,
  isBetweenHighlight,
  getCurrentYear,
  getCurrentMonth,
  getCurrentDay,
  getDateYear,
  getDateMonth,
  getDateDay,
};
