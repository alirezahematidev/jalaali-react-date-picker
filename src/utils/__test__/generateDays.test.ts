import moment from "moment-jalaali";
import { generateDays } from "../generateDays";
moment.loadPersian({ dialect: "persian-modern" });

const generateDaysCallback = () => {
  const fn = jest.fn(generateDays);
  expect(fn(12, 1401).days).toHaveLength(35);
  expect(fn(12, 1401).days[0].monthId).toBe(11);
  expect(fn(12, 1401).days[1].monthId).toBe(11);
  expect(fn(12, 1401).days[31].monthId).toBe(1);
  expect(fn(12, 1401).days[32].monthId).toBe(1);
  expect(fn(12, 1401).days[33].monthId).toBe(1);
  expect(fn(12, 1401).days[34].monthId).toBe(1);

  expect(fn(12, 1403).days[0].monthId).toBe(11);
  expect(fn(12, 1403).days[1].monthId).toBe(11);
  expect(fn(12, 1403).days[2].monthId).toBe(11);
  expect(fn(12, 1403).days[3].monthId).toBe(11);
  expect(fn(12, 1403).days[33].day).toBe(30);
  expect(fn(12, 1403).days[34].monthId).toBe(1);
};

test("generate days", generateDaysCallback);
