import { CSSProperties } from "react";
import { DateRangePickerTypes } from "../types";

export interface RangePickerProps {
  value?: DateRangePickerTypes.RangeValue;
  onChange?: DateRangePickerTypes.OnChange;
  onDayChange?: DateRangePickerTypes.OnDayChange;
  onMonthChange?: DateRangePickerTypes.OnMonthChange;
  onYearChange?: DateRangePickerTypes.OnYearChange;
  format?: DateRangePickerTypes.Format;
  locale?: DateRangePickerTypes.Locale;
  disabledDates?: DateRangePickerTypes.DisabledDates;
  onModeChange?: DateRangePickerTypes.OnModeChange;
  panelRender?: DateRangePickerTypes.panelRender;
  headerRender?: DateRangePickerTypes.headerRender;
  dayLabelRender?: DateRangePickerTypes.dayLabelRender;
  highlightOffDays?: DateRangePickerTypes.HighLightOffDays;
  customColors?: DateRangePickerTypes.Colors;
}

export interface RangePanelProps
  extends Pick<
    RangePickerProps,
    | "panelRender"
    | "headerRender"
    | "highlightOffDays"
    | "dayLabelRender"
    | "customColors"
  > {}

interface PickerProps extends RangePanelProps {}

interface RangePickerPickable
  extends Pick<
    RangePickerProps,
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

type InputRangePickerPickable = InputBuiltInProps & RangePickerPickable;

export interface InputRangePickerProps extends InputRangePickerPickable {
  rangeProps?: PickerProps;
  open?: boolean;
  disabled?: boolean;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  onOpenChange?: (open: boolean) => void;
}
