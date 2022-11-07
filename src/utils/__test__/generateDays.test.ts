import moment from "moment-jalaali";
import { generateDays } from "../generateDays";
moment.loadPersian({ dialect: "persian-modern" });

const generateDaysCallback = () => {
  const fn = jest.fn(generateDays);
  expect(fn(12, 1401, true).days).toHaveLength(42);
  expect(fn(12, 1401, true).days[0].month).toBe(11);
  expect(fn(12, 1401, true).days[1].month).toBe(11);
  expect(fn(12, 1401, true).days[31].month).toBe(1);
  expect(fn(12, 1401, true).days[32].month).toBe(1);
  expect(fn(12, 1401, true).days[33].month).toBe(1);
  expect(fn(12, 1401, true).days[34].month).toBe(1);

  expect(fn(12, 1403, true).days[0].month).toBe(11);
  expect(fn(12, 1403, true).days[1].month).toBe(11);
  expect(fn(12, 1403, true).days[2].month).toBe(11);
  expect(fn(12, 1403, true).days[3].month).toBe(11);
  expect(fn(12, 1403, true).days[33].day).toBe(30);
  expect(fn(12, 1403, true).days[34].month).toBe(1);
};

test("generate days", generateDaysCallback);
