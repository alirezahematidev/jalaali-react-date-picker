import { JalaaliDay } from "../../core/types/global.types";
import { getDaysOfMonth } from "../getDaysOfMonth";

const getDaysOfMonthTestCallback = () => {
  const fn = jest.fn(getDaysOfMonth);

  expect(fn(1, 1401)?.at(-1)).toStrictEqual<JalaaliDay>({
    id: "31",
    day: 31,
    month: 1,
    year: 1401,
  });
  expect(fn(7, 1401)?.at(-1)).toStrictEqual<JalaaliDay>({
    id: "30",
    day: 30,
    month: 7,
    year: 1401,
  });
  expect(fn(12, 1401)?.at(-1)).toStrictEqual<JalaaliDay>({
    id: "29",
    day: 29,
    month: 12,
    year: 1401,
  });

  // year 1403 is leap year.
  expect(fn(12, 1403)?.at(-1)).toStrictEqual<JalaaliDay>({
    id: "30",
    day: 30,
    month: 12,
    year: 1403,
  });
};

test("get days of month ", getDaysOfMonthTestCallback);
