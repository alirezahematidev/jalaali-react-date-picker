import { DateMetadata } from "../core/types/global.types";
import {
  getDaysOfGregorianMonth,
  getDaysOfJalaaliMonth,
} from "./getDaysOfMonth";

export const generatePrevMonthDays = ({
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
  let prevMonthDays: DateMetadata[] = [];

  if (isJalaali) {
    prevMonthDays = getDaysOfJalaaliMonth(
      currentMonth === 1 ? 12 : currentMonth - 1,
      currentMonth === 1 ? year - 1 : year,
    );
  } else {
    prevMonthDays = getDaysOfGregorianMonth(
      currentMonth === 1 ? 12 : currentMonth - 1,
      currentMonth === 1 ? year - 1 : year,
    );
  }
  return prevMonthDays
    .slice(-currentMonthWeekDay)
    .map((item) => ({ ...item, isNotCurrentMonth: true }));
};
