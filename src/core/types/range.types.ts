import { Moment as MomentType } from "moment-jalaali";
import * as React from "react";
import {
  ColorSchema,
  Date,
  Language,
  MonthNamedValue,
  RangeDate,
  RangeValue as RangeValueType,
} from "./global.types";

export namespace DateRangePickerTypes {
  /** @type `Moment` */
  export type Moment = MomentType;

  /** Return type of `onMonthChange` */
  export type MonthValue = MonthNamedValue;

  export type MonthRangeValue = [MonthValue, MonthValue];

  export type PanelDate = {
    days: Date[];
    dayLabels: string[];
    selected?: RangeDate;
  };

  export type Mode = "day" | "month" | "year";

  /** The `customColors` object that can be used to overrides the default colors */
  export type Colors = ColorSchema;

  /** @param `value` */
  export type RangeValue = RangeValueType;

  /** @param `defaultValue` */
  export type DefaultRangeValue = RangeValue;

  /**
   * The `onChange` method can be executed when date changes.
   *
   * @param `date`
   * @param `dateStrings`
   */
  export type OnChange = (
    date: RangeValue,
    dateStrings: [string, string],
  ) => void;
  /**
   * The `onDayChange` method can be executed when day changes.
   *
   * @param `days`
   */
  export type OnDayChange = (days: [number, number]) => void;
  /**
   * The `onMonthChange` method can be executed when month changes.
   *
   * @param `months`
   */
  export type OnMonthChange = (months: [MonthValue, MonthValue]) => void;
  /**
   * The `onYearChange` method can be executed when year changes.
   *
   * @param `years`
   */
  export type OnYearChange = (years: [number, number]) => void;

  /**
   * The `onModeChange` method can be called when panel mode changes.
   *
   * @param `mode`
   */
  export type OnModeChange = (mode: Mode) => void;

  /**
   * The `disableDates` method that can determine what dates should be disabled
   *
   * @param `current`
   * @returns `boolean`
   */
  export type DisabledDates = (current: Moment) => boolean;
  /**
   * The `dayRender` callback used to render custom node for day component.
   *
   * @param `dateRange` `dayNode`
   * @returns `React.ReactNode`
   */
  export type DayRender = (
    dateRange: [Moment, Moment],
    dayNode: React.ReactNode,
  ) => React.ReactNode;

  /**
   * The `highlightDays` object that can be used to determines what dates should
   * be off. if `weekend` set to `true`, its turn weekend days to off, also if
   * pass `customDates` as array, the passed dates turn into off.
   */
  export type HighlightDays = Moment[] | ((date: Moment) => boolean);
  export type Weekend = boolean;

  /** The `locale` object that can be configures the language of datepicker. */
  export type Locale = Language;
  /**
   * `format` turns the selected date into the formatted string value.
   *
   * @see https://momentjs.com/docs
   */
  export type Format = string | ((value: RangeValue) => string);

  /**
   * The `headerRender` callback used to render custom node for header component.
   *
   * @param `dateRange` `headerNode`
   * @returns `React.ReactNode`
   */
  export type HeaderRender = (
    dateRange: RangeValue | null,
    headerNode: React.ReactNode,
  ) => React.ReactNode;

  /**
   * The `panelRender` callback used to render custom node for panel component.
   *
   * @param `dateRange` `panelNode`
   * @returns `React.ReactNode`
   */
  export type PanelRender = (
    dateRange: [PanelDate, PanelDate],
    panelNode: React.ReactNode,
  ) => React.ReactNode;

  /**
   * The `dayLabelRender` callback used to render custom node for day labels component.
   *
   * @param `labels` `labelNode`
   * @returns `React.ReactNode`
   */
  export type DayLabelRender = (
    labels: string[],
    labelNode: React.ReactNode,
  ) => React.ReactNode;
}
