import { Moment } from "moment-jalaali";
import { Locale, Time, TimeMode } from "../types";

export interface TimePickerProps {
  value?: Moment | null;

  defaultValue?: Moment | null;

  locale?: Locale;

  onChange?: (time: Moment, timeString: string) => void;

  onHourChange?: (hour: number) => void;

  onMinuteChange?: (minute: number) => void;

  onModeChange?: (mode: TimeMode) => void;

  onClose?: () => void;

  format?: string | ((current: Moment) => string);

  minTime?: Moment | Time;

  maxTime?: Moment | Time;

  use12Hours?: boolean;

  dialogComponent?: "modal" | "popup";

  minutesStep?: number;

  hoursStep?: number;

  showNow?: boolean;

  closeOnSelect?: boolean;

  style?: React.CSSProperties;

  className?: string;
}
