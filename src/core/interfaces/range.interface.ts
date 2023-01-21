import { Moment } from "moment-jalaali";
import { CSSProperties } from "react";
import { ColorSchema, Date, Locale, Mode } from "../types";

type MonthValue = {
  name: string;
  value: number;
};

type PanelRange = {
  days: Date[];
  dayLabels: string[];
  selected?: {
    startDate: Date;
    endDate: Date | null;
  };
};
export interface RangePickerProps {
  /** The `customColors` can be used to overrides the default colors */
  customColors?: ColorSchema;

  /** The currently selected range date */
  value?: [Moment, Moment | null] | null;

  /**
   * To set default value, if `value` is `undefined` or `null`, the range picker
   * will show default value
   */
  defaultValue?: [Moment, Moment | null] | null;

  /**
   * The `onChange` method which will be executed when date changes.
   *
   * @param `date`
   * @param `dateStrings`
   */
  onChange?(
    date: [Moment, Moment | null] | null,
    dateStrings: [string, string],
  ): void;
  /**
   * The `onDayChange` method which will be executed when days changes.
   *
   * @param `days`
   */
  onDayChange?(days: [number, number]): void;
  /**
   * The `onMonthChange` method which will be executed when months changes.
   *
   * @param `months`
   */
  onMonthChange?(months: [MonthValue, MonthValue]): void;
  /**
   * The `onYearChange` method which will be executed when years changes.
   *
   * @param `years`
   */
  onYearChange?(years: [number, number]): void;

  /**
   * The `onModeChange` method can be called when panel mode changes.
   *
   * @param `mode`
   */
  onModeChange?(mode: Mode): void;

  /**
   * The `disableDates` method that can specify the dates that cannot be selected
   *
   * @param `current`
   * @returns `boolean`
   */
  disabledDates?(current: Moment): boolean;

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

  /**
   * The `locale` that can be configures the language of datepicker.
   *
   * @default `fa`
   */
  locale?: Locale;

  /**
   * To set the date format, refer to `momentjs`, selected value is formatting to a string
   *
   * @default `jYYYY-jMM-jDD`
   * @see https://momentjs.com/docs
   */
  format?: string | ((value: [Moment, Moment]) => string);

  /**
   * The `dayRender` callback used to render custom node for day component.
   *
   * @param `dateRange` `[Moment, Moment]`
   * @param `dayNode` `React.ReactNode`
   * @returns `React.ReactNode`
   */
  dayRender?(
    dateRange: [Moment, Moment],
    dayNode: React.ReactNode,
  ): React.ReactNode;

  /**
   * The `headerRender` callback used to render custom node for header component.
   *
   * @param `dateRange` `[Moment, Moment]`
   * @param `headerNode` `React.ReactNode`
   * @returns `React.ReactNode`
   */
  headerRender?(
    dateRange: [Moment, Moment | null] | null,
    headerNode: React.ReactNode,
  ): React.ReactNode;

  /**
   * The `panelRender` callback used to render custom node for panel component.
   *
   * @param `dateRange` `[PanelRange, PanelRange]`
   * @param `panelNode` `React.ReactNode`
   * @returns `React.ReactNode`
   */
  panelRender?(
    dateRange: [PanelRange, PanelRange],
    panelNode: React.ReactNode,
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
}

interface RangePanelProps
  extends Pick<
    RangePickerProps,
    | "panelRender"
    | "headerRender"
    | "highlightDays"
    | "dayLabelRender"
    | "onModeChange"
    | "highlightWeekend"
    | "style"
    | "className"
    | "loading"
    | "loadingIndicator"
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
    | "customColors"
  > {}

type InputBuiltInProps = Omit<
  React.HtmlHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "defaultValue" | "placeholder"
>;

type InputRangePickerPickable = InputBuiltInProps & RangePickerPickable;

export interface InputRangePickerProps extends InputRangePickerPickable {
  /** Popup calendar props */
  rangeProps?: RangeProps;

  /** To set `open` the popup calendar */
  open?: boolean;

  /** To set `disable` the popup calendar */
  disabled?: boolean;

  /** If `true`, the input will indicate an error */
  error?: boolean;

  /**
   * The preset range dates for quick selection
   *
   * @default true
   */
  presets?: boolean;

  /** The placeholder of date inputs */
  placeholder?: [string, string];

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
   * To set responsive, the range picker component is responsed and optimized to
   * device it runs on.
   *
   * @default `auto`
   */
  responsive?: "desktop" | "mobile" | "auto";

  /** Callback function, can be executed whether the popup calendar is popped up or closed */
  onOpenChange?: (open: boolean) => void;

  /** Callback function, can be executed when the clear icon is clicked */
  onClear?: () => void;

  /** Set separator between inputs */
  separator?: React.ReactNode;

  wrapperClassName?: string;

  wrapperStyle?: CSSProperties;
}
