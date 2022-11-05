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
  id: number;
  name: string;
};

export type JalaaliDay = {
  id: string;
  day: number;
  month: number;
  year: number;
  isNotCurrentMonth?: boolean;
};

export interface DateTransformer {
  year: number;
  month: number;
  day: number;
}
