import { DatePickerTypes } from "../types";

export interface DatePickerProps {
  value?: DatePickerTypes.Value;
  onChange?: DatePickerTypes.OnChange;
  format?: DatePickerTypes.Format;
  locale?: DatePickerTypes.Locale;
  showToday?: boolean;
  renderPanel?: DatePickerTypes.RenderPanel;
  renderFooter?: DatePickerTypes.RenderFooter;
  renderHeader?: DatePickerTypes.RenderHeader;
  disabledDates?: DatePickerTypes.DisabledDates;
  highlightOffDays?: DatePickerTypes.HighLightOffDays;
}

export interface PanelProps
  extends Pick<
    DatePickerProps,
    "renderPanel" | "renderFooter" | "renderHeader"
  > {}
