import { CSSProperties } from "react";
import { DateRangePickerTypes } from "../types";

export interface RangePickerProps {
  value?: DateRangePickerTypes.RangeValue;
  defaultValue?: DateRangePickerTypes.RangeValue;
  onChange?: DateRangePickerTypes.OnChange;
  onDayChange?: DateRangePickerTypes.OnDayChange;
  onMonthChange?: DateRangePickerTypes.OnMonthChange;
  onYearChange?: DateRangePickerTypes.OnYearChange;
  format?: DateRangePickerTypes.Format;
  locale?: DateRangePickerTypes.Locale;
  disabledDates?: DateRangePickerTypes.DisabledDates;
  onModeChange?: DateRangePickerTypes.OnModeChange;
  panelRender?: DateRangePickerTypes.PanelRender;
  headerRender?: DateRangePickerTypes.HeaderRender;
  dayLabelRender?: DateRangePickerTypes.DayLabelRender;
  highlightDays?: DateRangePickerTypes.HighlightDays;
  weekend?: DateRangePickerTypes.Weekend;
  customColors?: DateRangePickerTypes.Colors;
  nextIcon?: React.ReactNode | (() => React.ReactNode);
  prevIcon?: React.ReactNode | (() => React.ReactNode);
  superNextIcon?: React.ReactNode | (() => React.ReactNode);
  superPrevIcon?: React.ReactNode | (() => React.ReactNode);
}

interface RangePanelProps
  extends Pick<
    RangePickerProps,
    | "panelRender"
    | "headerRender"
    | "highlightDays"
    | "dayLabelRender"
    | "customColors"
    | "onModeChange"
    | "weekend"
  > {}

export interface RangeProps extends RangePanelProps {}

interface RangePickerPickable
  extends Pick<
    RangePickerProps,
    | "defaultValue"
    | "value"
    | "onChange"
    | "onDayChange"
    | "onMonthChange"
    | "onYearChange"
    | "format"
    | "locale"
    | "disabledDates"
    | "weekend"
  > {}

type InputBuiltInProps = Omit<
  React.HtmlHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "defaultValue"
>;

type InputRangePickerPickable = InputBuiltInProps & RangePickerPickable;

export interface InputRangePickerProps extends InputRangePickerPickable {
  rangeProps?: RangeProps;
  open?: boolean;
  disabled?: boolean;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  placement?: "top" | "bottom" | "right" | "left";
  onOpenChange?: (open: boolean) => void;
}
