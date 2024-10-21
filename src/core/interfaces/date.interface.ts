import { Moment } from "moment-jalaali";
import React, { ReactNode } from "react";
import { ColorSchema, Date, Locale, Mode } from "../types";

type MonthValue = {
  name: string;
  value: number;
};

export type PanelDate = {
  days: Date[];
  dayLabels: string[];
  selected?: Date;
};

export type FieldProps = {
  value?: string;
  /**
   * Determine based on locale, for `locale="fa"`, it will be `true`
   *
   * @default true
   */
  isJalaali?: boolean;
  /** The preset placeholder for selection */
  placeholder?: string;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export interface DatePickerProps {
  /** The currently selected date. */
  value?: Moment | undefined | null;

  /**
   * To set default value, if `value` is `undefined` or `null`, the date picker
   * will show default value
   */
  defaultValue?: Moment | undefined | null;

  /**
   * The `onChange` method which will be executed when date changes.
   *
   * @param `date`
   * @param `dateString`
   */
  onChange?(date: Moment | undefined | null, dateString: string): void;

  /**
   * The `onDayChange` method which will be executed when day changes.
   *
   * @param `day`
   */
  onDayChange?(day: number): void;

  /**
   * The `onMonthChange` method which will be executed when month changes.
   *
   * @param `month`
   */
  onMonthChange?(month: MonthValue): void;

  /**
   * The `onYearChange` method which will be executed when year changes.
   *
   * @param `year`
   */
  onYearChange?(year: number): void;

  /**
   * The format in which the selected date should be displayed. Uses moment.js
   * format strings.
   *
   * @default `jYYYY-jMM-jDD`
   * @see https://momentjs.com/docs
   */
  format?: string | ((value: Moment) => string);

  /**
   * The locale to be used for localization.
   *
   * @default `fa`
   */
  locale?: Locale;

  /**
   * The `disableDates` method that can specify the dates that cannot be selected
   *
   * @param `current`
   * @returns `boolean`
   */
  disabledDates?(current: Moment): boolean;

  /**
   * The `onModeChange` method which will be called when panel mode changes.
   *
   * @param `mode`
   */
  onModeChange?(mode: Mode): void;

  /**
   * The `panelRender` callback used to render custom node for panel component.
   *
   * @param `data` `PanelDate`
   * @param `panelNode` `React.ReactNode`
   * @returns `React.ReactNode`
   */
  panelRender?(data: PanelDate, panelNode: React.ReactNode): React.ReactNode;

  /**
   * The `footerRender` callback used to render custom node for footer component.
   *
   * @param `current` `Date`
   * @param `footerNode` `React.ReactNode`
   * @returns `React.ReactNode`
   */
  footerRender?(
    current: Date | null,
    footerNode: React.ReactNode,
  ): React.ReactNode;

  /**
   * The `headerRender` callback used to render custom node for header component.
   *
   * @param `current` `Date`
   * @param `headerNode` `React.ReactNode`
   * @returns `React.ReactNode`
   */
  headerRender?(
    current: Date | null,
    headerNode: React.ReactNode,
  ): React.ReactNode;

  /**
   * The `dayLabelRender` callback used to render custom node for day labels component.
   *
   * @param `labels` `string[]`
   * @param `labelNode` `React.ReactNode`
   * @returns `React.ReactNode`
   */
  dayLabelRender?(
    labels: string[],
    labelNode: React.ReactNode,
  ): React.ReactNode;

  /**
   * The `highlightDays` can be used to determines which dates should be
   * highlighted. it accepts array of `moments` or a callback function.
   */
  highlightDays?: Moment[] | ((date: Moment) => boolean);

  /**
   * If `highlightWeekend` set to `true`, its turn weekend days to highlighted
   *
   * @default true
   */
  highlightWeekend?: boolean;

  /** The `customColors` can be used to overrides the default colors */
  customColors?: ColorSchema;

  /** The custom next icon */
  nextIcon?: React.ReactNode;

  /** The custom previous icon */
  prevIcon?: React.ReactNode;

  /** The custom super next icon */
  superNextIcon?: React.ReactNode;

  /** The custom super previous icon */
  superPrevIcon?: React.ReactNode;

  /** If `true`, renders loading component in calendar instead of calendar panel */
  loading?: boolean;

  /** Set custom loading indicator */
  loadingIndicator?: React.ReactNode;

  style?: React.CSSProperties;

  className?: string;

  /** Callback to close popup */
  close?: () => void;
}

interface PanelProps
  extends Pick<
    DatePickerProps,
    | "panelRender"
    | "footerRender"
    | "headerRender"
    | "highlightDays"
    | "dayLabelRender"
    | "highlightWeekend"
    | "style"
    | "className"
    | "loading"
    | "loadingIndicator"
    | "onModeChange"
  > {}

export interface PickerProps extends PanelProps {}

interface DatePickerPickable
  extends Pick<
    DatePickerProps,
    | "value"
    | "defaultValue"
    | "onChange"
    | "onDayChange"
    | "onMonthChange"
    | "onYearChange"
    | "format"
    | "locale"
    | "disabledDates"
    | "customColors"
  > {}

type InputBuiltInProps = Omit<
  React.HtmlHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "defaultValue"
>;

type InputDatePickerPickable = InputBuiltInProps & DatePickerPickable;

export interface InputDatePickerProps extends InputDatePickerPickable {
  /** Popup calendar props */
  pickerProps?: PickerProps;
  /** To set `open` the popup calendar */
  open?: boolean;
  /** To set `disable` the popup calendar */
  disabled?: boolean;

  /** If `true`, the input will indicate an error */
  error?: boolean;

  /**
   * The preset date for quick selection
   *
   * @default true
   */
  presets?: boolean;

  /**
   * Customize date picker input render
   *
   * @param field `FieldProps`
   * @returns `ReactNode`
   */
  renderInput?: (field: FieldProps) => ReactNode;

  /** Input custom prefix icon */
  prefixIcon?: React.ReactNode;
  /** Input custom suffix icon */
  suffixIcon?: React.ReactNode;
  /** The position where the popup calendar box pops up */
  placement?: "top" | "bottom" | "right" | "left";
  /**
   * The mounted node for popup calendar
   *
   * @default `document.body`
   */
  getPopupContainer?: HTMLElement | (() => HTMLElement) | string;

  /**
   * Callback function, can be executed whether the popup calendar is popped up or closed
   *
   * @param open `boolean`
   */
  onOpenChange?: (open: boolean) => void;

  /** Callback function, can be executed when the clear icon is clicked */
  onClear?: () => void;

  wrapperClassName?: string;

  wrapperStyle?: React.CSSProperties;

  /** Whether close the popup after value change */
  closeOnChange?: boolean;
}
