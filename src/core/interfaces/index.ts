import { CSSProperties } from "react";
import { DatePickerTypes, DateRangePickerTypes } from "../types";

export interface DatePickerProps {
  value?: DatePickerTypes.Value;
  onChange?: DatePickerTypes.OnChange;
  onDayChange?: DatePickerTypes.OnDayChange;
  onMonthChange?: DatePickerTypes.OnMonthChange;
  onYearChange?: DatePickerTypes.OnYearChange;
  format?: DatePickerTypes.Format;
  locale?: DatePickerTypes.Locale;
  disabledDates?: DatePickerTypes.DisabledDates;
  onModeChange?: DatePickerTypes.OnModeChange;
  panelRender?: DatePickerTypes.panelRender;
  footerRender?: DatePickerTypes.footerRender;
  headerRender?: DatePickerTypes.headerRender;
  dayLabelRender?: DatePickerTypes.dayLabelRender;
  highlightOffDays?: DatePickerTypes.HighLightOffDays;
  customColors?: DatePickerTypes.Colors;
}
export interface DateRangePickerProps {
  value?: DateRangePickerTypes.RangeValue;
  onChange?: DateRangePickerTypes.OnChange;
}
export interface PanelProps
  extends Pick<
    DatePickerProps,
    | "panelRender"
    | "footerRender"
    | "headerRender"
    | "highlightOffDays"
    | "dayLabelRender"
    | "onModeChange"
    | "customColors"
  > {}

interface PickerProps extends PanelProps {}

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
  > {}

type InputBuiltInProps = Omit<
  React.HtmlHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
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
  placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  onOpenChange?: (open: boolean) => void;
}
