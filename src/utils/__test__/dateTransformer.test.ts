import moment from "moment-jalaali";
import { dateTransformer } from "../dateTransformer";
moment.loadPersian({ dialect: "persian-modern" });

const dateTransformerCallback = () => {
  const fn = jest.fn(dateTransformer);
  expect(
    fn({ day: 1, month: 3, year: 1401 }, true).format("jYYYY-jMM-jDD"),
  ).toBe("1401-03-01");
  expect(fn({ day: 1, month: 3, year: 1401 }, true).format("jMMMM")).toBe(
    "خرداد",
  );
  expect(
    fn({ day: 5, month: 11, year: 2022 }, false).format("jYYYY-jMM-jDD"),
  ).toBe("1401-08-14");
  expect(
    fn({ day: 5, month: 11, year: 2022 }, false).format("jYYYY/jMM/jDD"),
  ).toBe("1401/08/14");
  expect(() => fn({ day: 31, month: 12, year: 1401 }, true)).toThrowError();
  expect(() => fn({ day: 30, month: 12, year: 1403 }, true)).not.toThrowError();
  expect(() => fn({ day: -5, month: 11, year: 2022 }, false)).toThrowError();
  expect(() => fn({ day: -5, month: -11, year: 2022 }, false)).toThrowError();
  expect(() => fn({ day: -5, month: 0, year: -2022 }, false)).toThrowError();
};

test("date transform", dateTransformerCallback);
