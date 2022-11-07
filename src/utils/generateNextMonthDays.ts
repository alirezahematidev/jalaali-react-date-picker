import { DateMetadata } from "../core/types/global.types";
import {
  getDaysOfGregorianMonth,
  getDaysOfJalaaliMonth,
} from "./getDaysOfMonth";

export const generateNextMonthDays = ({
  currentMonthWeekDay,
  currentMonth,
  year,
  isJalaali = true,
}: {
  currentMonthWeekDay: number;
  currentMonth: number;
  year: number;
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
    );
  } else {
    nextMonthDays = getDaysOfGregorianMonth(
      currentMonth === 12 ? 1 : currentMonth + 1,
      currentMonth === 12 ? year + 1 : year,
    );
  }

  return nextMonthDays
    .slice(0, currentMonthWeekDay)
    .map((item) => ({ ...item, isNotCurrentMonth: true }));
};
