import moment from "moment-jalaali";
import { JalaaliMonth } from "../types/global.types";

const jalaaliMonths: JalaaliMonth[] = [
  {
    id: "1",
    name: "فروردین",
  },
  {
    id: "2",
    name: "اردیبهشت",
  },
  {
    id: "3",
    name: "خرداد",
  },
  {
    id: "4",
    name: "تیر",
  },
  {
    id: "5",
    name: "مرداد",
  },
  {
    id: "6",
    name: "شهریور",
  },
  {
    id: "7",
    name: "مهر",
  },
  {
    id: "8",
    name: "آبان",
  },
  {
    id: "9",
    name: "آذر",
  },
  {
    id: "10",
    name: "دی",
  },
  {
    id: "11",
    name: "بهمن",
  },
  {
    id: "12",
    name: "اسفند",
  },
];

const sortedJalaaliMonthsByCurrent = (): JalaaliMonth[] => {
  const currentMonthNumber = moment().format("jM");

  if (currentMonthNumber === "1") return jalaaliMonths;

  const currentMonthIndex = jalaaliMonths.findIndex(
    ({ id }) => id === currentMonthNumber,
  );

  const monthsBeforeCurrent = jalaaliMonths.slice(0, currentMonthIndex);

  const substracted = jalaaliMonths.filter(({ id }) =>
    monthsBeforeCurrent.every((m) => id !== m.id),
  );

  return substracted.concat(...monthsBeforeCurrent);
};

export { jalaaliMonths, sortedJalaaliMonthsByCurrent };
