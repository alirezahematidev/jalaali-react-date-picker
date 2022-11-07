import { Month } from "../types/global.types";

const gregorianMonths: Month[] = [
  {
    id: 1,
    name: "January",
  },
  {
    id: 2,
    name: "February",
  },
  {
    id: 3,
    name: "March",
  },
  {
    id: 4,
    name: "April",
  },
  {
    id: 5,
    name: "May",
  },
  {
    id: 6,
    name: "June",
  },
  {
    id: 7,
    name: "July",
  },
  {
    id: 8,
    name: "August",
  },
  {
    id: 9,
    name: "September",
  },
  {
    id: 10,
    name: "October",
  },
  {
    id: 11,
    name: "November",
  },
  {
    id: 12,
    name: "December",
  },
];
const jalaaliMonths: Month[] = [
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
const gregorianDayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export { gregorianMonths, jalaaliMonths, jalaaliDayLabels, gregorianDayLabels };
