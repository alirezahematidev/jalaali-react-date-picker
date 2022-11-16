import { LocalizedDayLabel, LocalizedMonth } from "../types/global.types";
import {
  gregorianDayLabels,
  gregorianMonths,
  jalaaliDayLabels,
  jalaaliMonths,
} from "./datasets";
import { de, en, es, fa, fr, Translation } from "./translations";

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
  de,
  es,
  fr,
};

export { localizedMonth, localizedDayLabels, translations };
