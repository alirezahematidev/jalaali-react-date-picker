import { Moment } from "moment-jalaali";
import { Time } from "../types";

export interface TimePickerProps {
  value?: Moment | null;

  defaultValue?: Moment | null;

  onChange?: (time: Moment, timeString: string) => void;

  onHourChange?: (hour: number) => void;

  onMinuteChange?: (minute: number) => void;

  format?: string | ((current: Moment) => string);

  minTime?: Time;

  maxTime?: Time;

  use12Hours?: boolean;

  ampm?: boolean;

  dialogComponent?: "modal" | "popup";

  minutesStep?: number;

  hoursStep?: number;

  showNow?: boolean;

  style?: React.CSSProperties;

  className?: string;
}
