import { Language } from "../types/global.types";

const fa = {
  today: "امروز",
} as const;

const en = {
  today: "Today",
} as const;

const de = {
  today: "Vandaag",
} as const;

const fr = {
  today: "Aujourd'hui",
} as const;

const es = {
  today: "Este dia",
} as const;

type TranslationKey = keyof typeof fa;

type Translation = Record<Language, Record<TranslationKey, string>>;

export type { TranslationKey, Translation };

export { fa, en, fr, de, es };
