import { Locale } from "../types/global.types";

const fa = {
  today: "امروز",
  startDate: "تاریخ شروع",
  endDate: "تاریخ پایان",
  to: "تا",
} as const;

const en = {
  today: "Today",
  startDate: "Start date",
  endDate: "End date",
  to: "to",
} as const;

type TranslationKey = keyof typeof fa;

type Translation = Record<Locale, Record<TranslationKey, string>>;

export type { TranslationKey, Translation };
export { fa, en };
