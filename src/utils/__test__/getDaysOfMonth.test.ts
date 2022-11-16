import {
  getDaysOfGregorianMonth,
  getDaysOfJalaaliMonth,
} from "../getDaysOfMonth";

const getDaysOfJalaaliMonthTestCallback = () => {
  const fn = jest.fn(getDaysOfJalaaliMonth);

  // expect(fn(1, 1401)?.at(-1)).toStrictEqual<DateMetadata>({
  //   id: "31",
  //   day: 31,
  //   month: 1,
  //   year: 1401,
  // });
  // expect(fn(7, 1401)?.at(-1)).toStrictEqual<DateMetadata>({
  //   id: "30",
  //   day: 30,
  //   month: 7,
  //   year: 1401,
  // });
  // expect(fn(12, 1401)?.at(-1)).toStrictEqual<DateMetadata>({
  //   id: "29",
  //   day: 29,
  //   month: 12,
  //   year: 1401,
  // });

  // // year 1403 is leap year.
  // expect(fn(12, 1403)?.at(-1)).toStrictEqual<DateMetadata>({
  //   id: "30",
  //   day: 30,
  //   month: 12,
  //   year: 1403,
  // });
};

test("get days of jalaali month ", getDaysOfJalaaliMonthTestCallback);

const getDaysOfGregorianMonthTestCallback = () => {
  const fn = jest.fn(getDaysOfGregorianMonth);

  // expect(fn(1, 2022)?.at(-1)).toStrictEqual<DateMetadata>({
  //   id: "31",
  //   day: 31,
  //   month: 1,
  //   year: 2022,
  // });
  // expect(fn(4, 2022)?.at(-1)).toStrictEqual<DateMetadata>({
  //   id: "30",
  //   day: 30,
  //   month: 4,
  //   year: 2022,
  // });
  // expect(fn(2, 2022)?.at(-1)).toStrictEqual<DateMetadata>({
  //   id: "28",
  //   day: 28,
  //   month: 2,
  //   year: 2022,
  // });

  // // year 1403 is leap year.
  // expect(fn(2, 2024)?.at(-1)).toStrictEqual<DateMetadata>({
  //   id: "29",
  //   day: 29,
  //   month: 2,
  //   year: 2024,
  // });
};

test("get days of gregorian  month ", getDaysOfGregorianMonthTestCallback);
