import { listOfYears } from "../listOfYears";

const listOfYearsTestCallback = () => {
  const fn = jest.fn(listOfYears);
  const { years } = fn();

  expect(years.length).toBe(12);
  expect(years[0].isNotCurrentDecade).toBe(true);
  expect(years[0].isNotCurrentDecade).toBe(true);
};

test("get list of years", listOfYearsTestCallback);
