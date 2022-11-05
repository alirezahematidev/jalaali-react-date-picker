import moment from "moment-jalaali";
import { generatePrevMonthDays } from "../generatePrevMonthDays";
moment.loadPersian({ dialect: "persian-modern" });

const generateDaysCallback = () => {
  const fn = jest.fn(generatePrevMonthDays);
  expect(
    fn({ currentMonth: 11, jYear: 1401, currentMonthWeekDay: 0 }).length,
  ).toBe(0);
  expect(
    fn({ currentMonth: 12, jYear: 1401, currentMonthWeekDay: 2 }).length,
  ).toBe(2);
  expect(
    fn({ currentMonth: 1, jYear: 1402, currentMonthWeekDay: 3 }).length,
  ).toBe(3);
};

test("generate prev month days", generateDaysCallback);
