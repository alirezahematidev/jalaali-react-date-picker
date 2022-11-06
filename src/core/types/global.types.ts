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
};

export interface DateMetadata extends Date {
  id: string;
  isNotCurrentMonth?: boolean;
}

export interface Date {
  year: number;
  month: number;
  day: number;
}
