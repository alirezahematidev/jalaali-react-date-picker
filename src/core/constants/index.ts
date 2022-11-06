import { LocalizedDayLabel, LocalizedMonth } from "../types/global.types";
import {
  gregorianMonths,
  jalaaliMonths,
  gregorianDayLabels,
  jalaaliDayLabels,
} from "./datasets";
import { en, fa, Translation } from "./translations";

const localizedMonth: LocalizedMonth = {
  fa: jalaaliMonths,
  en: gregorianMonths,
  de: [],
  es: [],
  fr: [],
};

const localizedDayLabels: LocalizedDayLabel = {
  fa: jalaaliDayLabels,
  en: gregorianDayLabels,
  de: [],
  es: [],
  fr: [],
};

const translations: Translation = {
  fa,
  en,
  de: { today: "" },
  es: { today: "" },
  fr: { today: "" },
};

export { localizedMonth, localizedDayLabels, translations };
