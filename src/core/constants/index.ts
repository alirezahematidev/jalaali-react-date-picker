import { LocalizedDayLabel, LocalizedMonth } from "../types/global.types";
import {
  gregorianDayLabels,
  gregorianMonths,
  jalaaliDayLabels,
  jalaaliMonths,
} from "./datasets";
import { en, fa, Translation } from "./translations";

const localizedMonth: LocalizedMonth = {
  fa: jalaaliMonths,
  en: gregorianMonths,
};

const localizedDayLabels: LocalizedDayLabel = {
  fa: jalaaliDayLabels,
  en: gregorianDayLabels,
};

const translations: Translation = {
  fa,
  en,
};

export { localizedMonth, localizedDayLabels, translations };
