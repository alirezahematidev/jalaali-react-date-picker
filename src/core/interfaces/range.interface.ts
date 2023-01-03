import { Moment } from "moment-jalaali";
import { CSSProperties } from "react";
import { ColorSchema, Date, Language, Mode } from "../types";
export interface RangePickerProps {
  /** The `customColors` object that can be used to overrides the default colors */
  customColors?: ColorSchema;

  /** @param `value` */
  value?: [Moment, Moment];

  /** @param `defaultValue` */
  defaultValue?: [Moment, Moment];

  /**
   * The `onChange` method which will be executed when date changes.
   *
   * @param `date`
   * @param `dateStrings`
   */
  onChange?: (date: [Moment, Moment], dateStrings: [string, string]) => void;
  /**
   * The `onDayChange` method which will be executed when day changes.
   *
   * @param `days`
   */
  onDayChange?: (days: [number, number]) => void;
  /**
   * The `onMonthChange` method which will be executed when month changes.
   *
   * @param `months`
   */
  onMonthChange?: (
    months: [
      {
        name: string;
        value: number;
      },
      {
        name: string;
        value: number;
      },
    ],
  ) => void;
  /**
   * The `onYearChange` method which will be executed when year changes.
   *
   * @param `years`
   */
  onYearChange?: (years: [number, number]) => void;

  /**
   * The `onModeChange` method can be called when panel mode changes.
   *
   * @param `mode`
   */
  onModeChange?: (mode: Mode) => void;

  /**
   * The `disableDates` method that can determine which dates should be disabled
   *
   * @param `current`
   * @returns `boolean`
   */
  disabledDates?: (current: Moment) => boolean;
  /**
   * The `dayRender` callback used to render custom node for day component.
   *
   * @param `dateRange` `dayNode`
   * @returns `React.ReactNode`
   */
  dayRender?: (
    dateRange: [Moment, Moment],
    dayNode: React.ReactNode,
  ) => React.ReactNode;

  /**
   * The `highlightDays` can be used to determines what dates should be
   * highlighted. it accepts array or fucntion.
   */
  highlightDays?: Moment[] | ((date: Moment) => boolean);

  /** If `weekend` set to `true`, its turn weekend days to highlighted */
  weekend?: boolean;

  /** The `locale` object that can be configures the language of datepicker. */
  locale?: Language;
  /**
   * `format` turns the selected date into the formatted string value.
   *
   * @see https://momentjs.com/docs
   */
  format?: string | ((value: [Moment, Moment]) => string);

  /**
   * The `headerRender` callback used to render custom node for header component.
   *
   * @param `dateRange` `headerNode`
   * @returns `React.ReactNode`
   */
  headerRender?: (
    dateRange: [Moment, Moment] | null,
    headerNode: React.ReactNode,
  ) => React.ReactNode;

  /**
   * The `panelRender` callback used to render custom node for panel component.
   *
   * @param `dateRange` `panelNode`
   * @returns `React.ReactNode`
   */
  panelRender?: (
    dateRange: [
      {
        days: Date[];
        dayLabels: string[];
        selected?: {
          startDate: Date;
          endDate: Date | null;
        };
      },
      {
        days: Date[];
        dayLabels: string[];
        selected?: {
          startDate: Date;
          endDate: Date | null;
        };
      },
    ],
    panelNode: React.ReactNode,
  ) => React.ReactNode;

  /**
   * The `dayLabelRender` callback used to render custom node for day labels component.
   *
   * @param `labels` `labelNode`
   * @returns `React.ReactNode`
   */
  dayLabelRender?: (
    labels: string[],
    labelNode: React.ReactNode,
  ) => React.ReactNode;

  /** Render icon for the next month icon */
  nextIcon?: React.ReactNode | (() => React.ReactNode);

  /** Render icon for the previous month icon */
  prevIcon?: React.ReactNode | (() => React.ReactNode);

  /** Render icon for the next year icon */
  superNextIcon?: React.ReactNode | (() => React.ReactNode);

  /** Render icon for the previous year icon */
  superPrevIcon?: React.ReactNode | (() => React.ReactNode);

  style?: CSSProperties;

  className?: string;
}

interface RangePanelProps
  extends Pick<
    RangePickerProps,
    | "panelRender"
    | "headerRender"
    | "highlightDays"
    | "dayLabelRender"
    | "customColors"
    | "onModeChange"
    | "weekend"
    | "style"
    | "className"
  > {}

export interface RangeProps extends RangePanelProps {}

interface RangePickerPickable
  extends Pick<
    RangePickerProps,
    | "defaultValue"
    | "value"
    | "onChange"
    | "onDayChange"
    | "onMonthChange"
    | "onYearChange"
    | "format"
    | "locale"
    | "disabledDates"
    | "weekend"
  > {}

type InputBuiltInProps = Omit<
  React.HtmlHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "defaultValue"
>;

type InputRangePickerPickable = InputBuiltInProps & RangePickerPickable;

export interface InputRangePickerProps extends InputRangePickerPickable {
  rangeProps?: RangeProps;
  open?: boolean;
  disabled?: boolean;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  placement?: "top" | "bottom" | "right" | "left";
  onOpenChange?: (open: boolean) => void;
}
