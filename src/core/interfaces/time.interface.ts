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

  format?: string | ((current: Moment) => string);

  minTime?: Moment | Time;

  maxTime?: Moment | Time;

  use12Hours?: boolean;

  minutesStep?: number;

  hoursStep?: number;

  showNow?: boolean;

  style?: React.CSSProperties;

  className?: string;
}

interface TimePickerPickable extends TimePickerProps {}

type InputBuiltInProps = Omit<
  React.HtmlHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "defaultValue"
>;

type InputTimePickerPickable = InputBuiltInProps & TimePickerPickable;

export interface InputTimePickerProps extends InputTimePickerPickable {
  onClose?: () => void;

  closeOnSelect?: boolean;

  open?: boolean;

  disabled?: boolean;

  error?: boolean;

  /** Input custom prefix icon */
  prefixIcon?: React.ReactNode;
  /** Input custom suffix icon */
  suffixIcon?: React.ReactNode;

  /** The position where the popup calendar box pops up */
  placement?: "top" | "bottom" | "right" | "left";

  /**
   * Callback function, can be executed whether the popup calendar is popped up or closed
   *
   * @param open `boolean`
   */
  onOpenChange?: (open: boolean) => void;

  /** Callback function, can be executed when the clear icon is clicked */
  onClear?: () => void;
}
