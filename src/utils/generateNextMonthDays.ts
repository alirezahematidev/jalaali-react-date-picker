import { DateMetadata, DatePickerProps } from "../core";
import {
  getDaysOfGregorianMonth,
  getDaysOfJalaaliMonth,
} from "./getDaysOfMonth";

export const generateNextMonthDays = ({
  currentMonthWeekDay,
  currentMonth,
  year,
  isJalaali = true,
  disabledDates,
}: {
  currentMonthWeekDay: number;
  currentMonth: number;
  year: number;
  disabledDates: DatePickerProps["disabledDates"];
  isJalaali?: boolean;
}) => {
  if (currentMonthWeekDay === 0) {
    return [];
  }

  let nextMonthDays: DateMetadata[] = [];

  if (isJalaali) {
    nextMonthDays = getDaysOfJalaaliMonth(
      currentMonth === 12 ? 1 : currentMonth + 1,
      currentMonth === 12 ? year + 1 : year,
      disabledDates,
    );
  } else {
    nextMonthDays = getDaysOfGregorianMonth(
      currentMonth === 12 ? 1 : currentMonth + 1,
      currentMonth === 12 ? year + 1 : year,
      disabledDates,
    );
  }

  return nextMonthDays
    .slice(0, currentMonthWeekDay)
    .map((item) => ({ ...item, isNotCurrentMonth: true }));
};
