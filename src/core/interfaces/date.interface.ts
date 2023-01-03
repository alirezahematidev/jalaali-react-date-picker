import { Moment } from "moment-jalaali";
import React, { CSSProperties } from "react";
import { ColorSchema, Date, Mode } from "../types";

type MonthValue = {
  name: string;
  value: number;
};

export type PanelDate = {
  days: Date[];
  dayLabels: string[];
  selected?: Date;
};

export interface DatePickerProps {
  /** @param `value` */
  value?: Moment | undefined | null;

  /** @param `defaultValue` */
  defaultValue?: Moment | undefined | null;

  /**
   * The `onChange` method can be executed when date changes.
   *
   * @param `date`
   * @param `dateStrings`
   */
  onChange?: (date: Moment | undefined | null, dateString: string) => void;

  /**
   * The `onDayChange` method can be executed when day changes.
   *
   * @param `day`
   */
  onDayChange?: (day: number) => void;

  /**
   * The `onMonthChange` method can be executed when month changes.
   *
   * @param `month`
   */
  onMonthChange?: (month: MonthValue) => void;

  /**
   * The `onYearChange` method can be executed when year changes.
   *
   * @param `year`
   */
  onYearChange?: (year: number) => void;

  /**
   * `format` turns the selected date into the formatted string value.
   *
   * @see https://momentjs.com/docs
   */
  format?: string | ((value: Moment) => string);

  /** The `locale` that can be configures the language of datepicker. */
  locale?: "fa" | "en";

  /**
   * The `disableDates` method that can determine what dates should be disabled
   *
   * @param `current`
   * @returns `boolean`
   */
  disabledDates?: (current: Moment) => boolean;

  /**
   * The `onModeChange` method can be called when panel mode changes.
   *
   * @param `mode`
   */
  onModeChange?: (mode: Mode) => void;

  /**
   * The `panelRender` callback used to render custom node for panel component.
   *
   * @param `data` `panelNode`
   * @returns `React.ReactNode`
   */
  panelRender?: (
    data: PanelDate,
    panelNode: React.ReactNode,
  ) => React.ReactNode;

  /**
   * The `footerRender` callback used to render custom node for footer component.
   *
   * @param `current` `footerNode`
   * @returns `React.ReactNode`
   */
  footerRender?: (
    current: Date | null,
    footerNode: React.ReactNode,
  ) => React.ReactNode;

  /**
   * The `headerRender` callback used to render custom node for header component.
   *
   * @param `current` `headerNode`
   * @returns `React.ReactNode`
   */
  headerRender?: (
    current: Date | null,
    headerNode: React.ReactNode,
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

  /**
   * The `highlightDays` object that can be used to determines what dates should
   * be off. if `weekend` set to `true`, its turn weekend days to off, also if
   * pass `customDates` as array, the passed dates turn into off.
   */
  highlightDays?: Moment[] | ((date: Moment) => boolean);

  /** If `weekend` set to `true`, its turn weekend days to off */
  weekend?: boolean;

  /** The `customColors` object that can be used to overrides the default colors */
  customColors?: ColorSchema;

  /** Render icon for the next month icon */
  nextIcon?: React.ReactNode;

  /** Render icon for the previous month icon */
  prevIcon?: React.ReactNode;

  /** Render icon for the next year icon */
  superNextIcon?: React.ReactNode;

  /** Render icon for the previous year icon */
  superPrevIcon?: React.ReactNode;

  style?: CSSProperties;

  className?: string;
}

interface PanelProps
  extends Pick<
    DatePickerProps,
    | "panelRender"
    | "footerRender"
    | "headerRender"
    | "highlightDays"
    | "dayLabelRender"
    | "onModeChange"
    | "customColors"
    | "weekend"
    | "defaultValue"
    | "style"
    | "className"
  > {}

export interface PickerProps extends PanelProps {}

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
    | "weekend"
    | "defaultValue"
  > {}

type InputBuiltInProps = Omit<
  React.HtmlHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "defaultValue"
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
  placement?: "top" | "bottom" | "right" | "left";
  onOpenChange?: (open: boolean) => void;
}
