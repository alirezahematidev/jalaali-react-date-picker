import { listOfYears } from "../listOfYears";

const listOfYearsTestCallback = () => {
  const fn = jest.fn(listOfYears);

  expect(fn().length).toBe(1401);
  expect(fn().at(0)).toBe(1);
  expect(fn().at(-1)).toBe(1401);
};

test("get list of years", listOfYearsTestCallback);
