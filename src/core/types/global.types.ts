import { Moment } from "moment-jalaali";

export type ColorSchema = {
  textDark?: string;
  textLight?: string;
  primary?: string;
  primaryFade?: string;
  background?: string;
  backgroundDisabled?: string;
  backgroundHovered?: string;
  border?: string;
  textNegative?: string;
  dayLabelBackground?: string;
  highlight?: string;
  weekend?: string;
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

export type RangeDate = {
  startDate: Date;
  endDate: Date | null;
};

export type RangeValue = [Moment, Moment];

export type Language = "fa" | "en";

export type LocalizedMonth = Record<Language, Month[]>;

export type LocalizedDayLabel = Record<Language, string[]>;

export type NavigationIcon = {
  nextIcon?: React.ReactNode;
  prevIcon?: React.ReactNode;
  superNextIcon?: React.ReactNode;
  superPrevIcon?: React.ReactNode;
};
