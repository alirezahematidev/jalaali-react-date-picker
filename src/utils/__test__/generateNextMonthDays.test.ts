import moment from "moment-jalaali";
import { generateNextMonthDays } from "../generateNextMonthDays";
moment.loadPersian({ dialect: "persian-modern" });

const generateDaysCallback = () => {
  const fn = jest.fn(generateNextMonthDays);
  expect(
    fn({ currentMonth: 11, jYear: 1401, currentMonthWeekDay: 5 }).length,
  ).toBe(5);
  expect(
    fn({ currentMonth: 12, jYear: 1401, currentMonthWeekDay: 4 }).length,
  ).toBe(4);
  expect(
    fn({ currentMonth: 1, jYear: 1402, currentMonthWeekDay: 1 }).length,
  ).toBe(1);
};

test("generate next month days", generateDaysCallback);
