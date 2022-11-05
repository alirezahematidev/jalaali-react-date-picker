import moment from "moment-jalaali";
import { JalaaliMonth } from "../types/global.types";

const jalaaliMonths: JalaaliMonth[] = [
  {
    id: 1,
    name: "فروردین",
  },
  {
    id: 2,
    name: "اردیبهشت",
  },
  {
    id: 3,
    name: "خرداد",
  },
  {
    id: 4,
    name: "تیر",
  },
  {
    id: 5,
    name: "مرداد",
  },
  {
    id: 6,
    name: "شهریور",
  },
  {
    id: 7,
    name: "مهر",
  },
  {
    id: 8,
    name: "آبان",
  },
  {
    id: 9,
    name: "آذر",
  },
  {
    id: 10,
    name: "دی",
  },
  {
    id: 11,
    name: "بهمن",
  },
  {
    id: 12,
    name: "اسفند",
  },
];

const jalaaliDayLabels = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

export { jalaaliMonths, jalaaliDayLabels };
