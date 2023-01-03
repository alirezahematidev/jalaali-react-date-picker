import { Language } from "../types/global.types";

const fa = {
  today: "امروز",
} as const;

const en = {
  today: "Today",
} as const;

type TranslationKey = keyof typeof fa;

type Translation = Record<Language, Record<TranslationKey, string>>;

export type { TranslationKey, Translation };
export { fa, en };
