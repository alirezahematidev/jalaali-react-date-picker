import { DatePickerTypes } from "../types";

export interface DatePickerProps {
  value?: DatePickerTypes.Value;
  onChange?: DatePickerTypes.OnChange;
  format?: DatePickerTypes.Format;
  locale?: DatePickerTypes.Locale;
  showToday?: boolean;
  renderCustomPanel?: DatePickerTypes.RenderCustomPanel;
  renderFooter?: DatePickerTypes.RenderFooter;
  renderHeader?: DatePickerTypes.RenderHeader;
  disabledDates?: DatePickerTypes.DisabledDates;
  highlightOffDays?: DatePickerTypes.HighLightOffDays;
  renderDayLabel?: DatePickerTypes.RenderDayLabel;
}

export interface PanelProps
  extends Pick<
    DatePickerProps,
    | "renderCustomPanel"
    | "renderFooter"
    | "renderHeader"
    | "highlightOffDays"
    | "renderDayLabel"
  > {}
