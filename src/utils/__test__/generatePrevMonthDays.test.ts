import moment from "moment-jalaali";
import { generatePrevMonthDays } from "../generatePrevMonthDays";
moment.loadPersian({ dialect: "persian-modern" });

const generateDaysCallback = () => {
  const fn = jest.fn(generatePrevMonthDays);
  expect(
    fn({
      currentMonth: 11,
      year: 1401,
      currentMonthWeekDay: 0,
      disabledDates: () => false,
    }).length,
  ).toBe(0);
  expect(
    fn({
      currentMonth: 12,
      year: 1401,
      currentMonthWeekDay: 2,
      disabledDates: () => false,
    }).length,
  ).toBe(2);
  expect(
    fn({
      currentMonth: 1,
      year: 1402,
      currentMonthWeekDay: 3,
      disabledDates: () => false,
    }).length,
  ).toBe(3);
};

test("generate prev month days", generateDaysCallback);
