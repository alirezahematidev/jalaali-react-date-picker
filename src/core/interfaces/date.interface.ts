import React, { CSSProperties } from "react";
import { DatePickerTypes } from "../types";

export interface DatePickerProps {
  value?: DatePickerTypes.Value;
  defaultValue?: DatePickerTypes.Value;
  onChange?: DatePickerTypes.OnChange;
  onDayChange?: DatePickerTypes.OnDayChange;
  onMonthChange?: DatePickerTypes.OnMonthChange;
  onYearChange?: DatePickerTypes.OnYearChange;
  format?: DatePickerTypes.Format;
  locale?: DatePickerTypes.Locale;
  disabledDates?: DatePickerTypes.DisabledDates;
  onModeChange?: DatePickerTypes.OnModeChange;
  panelRender?: DatePickerTypes.PanelRender;
  footerRender?: DatePickerTypes.FooterRender;
  headerRender?: DatePickerTypes.HeaderRender;
  dayLabelRender?: DatePickerTypes.DayLabelRender;
  highlightDays?: DatePickerTypes.HighlightDays;
  weekend?: DatePickerTypes.Weekend;
  customColors?: DatePickerTypes.Colors;
  nextIcon?: React.ReactNode;
  prevIcon?: React.ReactNode;
  superNextIcon?: React.ReactNode;
  superPrevIcon?: React.ReactNode;
}

interface PanelProps
  extends Pick<
    DatePickerProps,
    | "panelRender"
    | "footerRender"
    | "headerRender"
    | "highlightDays"
    | "dayLabelRender"
    | "onModeChange"
    | "customColors"
    | "weekend"
    | "defaultValue"
  > {}

export interface PickerProps extends PanelProps {}

interface DatePickerPickable
  extends Pick<
    DatePickerProps,
    | "value"
    | "onChange"
    | "onDayChange"
    | "onMonthChange"
    | "onYearChange"
    | "format"
    | "locale"
    | "disabledDates"
    | "weekend"
    | "defaultValue"
  > {}

type InputBuiltInProps = Omit<
  React.HtmlHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "defaultValue"
>;

type InputDatePickerPickable = InputBuiltInProps & DatePickerPickable;

export interface InputDatePickerProps extends InputDatePickerPickable {
  pickerProps?: PickerProps;
  open?: boolean;
  disabled?: boolean;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  placement?: "top" | "bottom" | "right" | "left";
  onOpenChange?: (open: boolean) => void;
}
