import { DatePickerTypes } from "../types";
import { Date } from "../types/global.types";

export interface DatePickerProps {
  value?: DatePickerTypes.Value;
  onChange?: DatePickerTypes.OnChange;
  format?: DatePickerTypes.Format;
  locale?: DatePickerTypes.Locale;
  isJalaali?: DatePickerTypes.IsJalaali;
  showGoToToday?: boolean;
  renderFooter?: DatePickerTypes.RenderFooter;
  renderExtraHeader?: DatePickerTypes.RenderExtraHeader;
  disabledDates?: DatePickerTypes.DisabledDates;
  highlightDays?: { weekend?: boolean; customDates?: Date[] };
}
