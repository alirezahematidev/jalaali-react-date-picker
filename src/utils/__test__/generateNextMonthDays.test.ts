import moment from "moment-jalaali";
import { generateNextMonthDays } from "../generateNextMonthDays";
moment.loadPersian({ dialect: "persian-modern" });

const generateDaysCallback = () => {
  const fn = jest.fn(generateNextMonthDays);

  expect(
    fn({
      currentMonth: 11,
      year: 1401,
      currentMonthWeekDay: 5,
      disabledDates: () => false,
    }).length,
  ).toBe(5);
  expect(
    fn({
      currentMonth: 12,
      year: 1401,
      currentMonthWeekDay: 4,
      disabledDates: () => false,
    }).length,
  ).toBe(4);
  expect(
    fn({
      currentMonth: 1,
      year: 1402,
      currentMonthWeekDay: 1,
      disabledDates: () => false,
    }).length,
  ).toBe(1);
};

test("generate next month days", generateDaysCallback);
