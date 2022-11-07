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
  const res: DateMetadata[] = [];

  for (
    let i = prevMonthDays.length;
    i > prevMonthDays.length - currentMonthWeekDay;
    i--
  ) {
    res.unshift({ ...prevMonthDays[i - 1], isNotCurrentMonth: true });
  }

  return res.length === 7 ? [] : res;
};
