import { Moment } from "moment-jalaali";

export interface TimePickerProps {
  value?: Moment | null;

  defaultValue?: Moment | null;

  onChange?: (time: Moment, timeString: string) => void;

  onHourChange?: (hour: number) => void;

  onMinuteChange?: (minute: number) => void;

  format?: string | ((current: Moment) => string);

  minTime?: { hour: number; minute: number };

  maxTime?: { hour: number; minute: number };

  use12Hours?: boolean;

  ampm?: boolean;

  dialogComponent?: "modal" | "popup";

  minutesStep?: number;

  hoursStep?: number;

  showNow?: boolean;

  style?: React.CSSProperties;

  className?: string;
}
