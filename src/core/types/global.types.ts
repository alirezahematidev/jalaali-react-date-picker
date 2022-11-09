export type ColorSchema = {
  textDark?: string;
  textLight?: string;
  highlight?: string;
  textDisabled?: string;
  background?: string;
  backgroundDisabled?: string;
  backgroundHovered?: string;
  light?: string;
};

export type MonthNamedValue = {
  name: string;
  value: number;
};

export type Month = {
  id: number;
  name: string;
  isDisabled?: boolean;
};
export type Year = {
  id: number;
  isDisabled?: boolean;
  isNotCurrentDecade?: boolean;
};

export interface DateMetadata extends Date {
  id: string;
  isNotCurrentMonth?: boolean;
  isWeekend?: boolean;
  isDisabled?: boolean;
}

export interface Date {
  year: number;
  month: number;
  day: number;
}

export type Language = "fa" | "en" | "de" | "fr" | "es";

export type LocalizedMonth = Record<Language, Month[]>;

export type LocalizedDayLabel = Record<Language, string[]>;
