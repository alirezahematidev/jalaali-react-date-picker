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

export type JalaaliMonth = {
  id: string;
  name: string;
};

export type MonthKey =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";

export type JalaaliDay = {
  id: string;
  day: number;
  monthId: MonthKey;
};
