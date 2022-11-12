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
  /**
   * Default type of date picker
   *
   * @type {Moment}
   */
  export type Moment = MomentType;

  /** Return type of month onChange */
  export type MonthValue = MonthNamedValue;

  export type MonthRangeValue = [MonthValue, MonthValue];

  export type PanelDate = {
    days: Date[];
    dayLabels: string[];
    selected?: RangeDate;
  };

  export type Mode = "day" | "month" | "year";

  /**
   * Override all default colors
   *
   * @param {Colors} [colors]
   */
  export type Colors = ColorSchema;
  /**
   * Type of range date value
   *
   * @param {RangeValue} [value]
   */
  export type RangeValue = RangeValueType;
  /**
   * Type of date default value
   *
   * @param {RangeValue} [defaultValue]
   */
  export type DefaultRangeValue = RangeValue;
  /**
   * Type of range dates
   *
   * @example
   *   ["2022-11-02T14:40:44.181Z", "2022-11-05T14:40:44.181Z"];
   */
  export type DisabledValueRange = [Moment | null, Moment?];
  /**
   * Callback that return current value
   *
   * @param {RangeValue} [date]
   * @param {[string, string]} [dateStrings]
   */
  export type OnChange = (
    date: RangeValue,
    dateStrings: [string, string],
  ) => void;
  /**
   * Callback that return current day
   *
   * @param {Moment} [day]
   */
  export type OnDayChange = (days: [number, number]) => void;
  /**
   * Callback that return current month
   *
   * @param {Moment} [month]
   */
  export type OnMonthChange = (months: [MonthValue, MonthValue]) => void;
  /**
   * Callback that return current year
   *
   * @param {Moment} [year]
   */
  export type OnYearChange = (years: [number, number]) => void;

  export type OnModeChange = (mode: Mode) => void;

  /**
   * A callback that can determine what dates should be disabled
   *
   * @param {Moment} [current]
   * @returns Boolean | ValueRange
   */
  export type DisabledDates = (current: Moment) => boolean;
  /**
   * A render callback that allows to customize day node
   *
   * @param {Moment} [date]
   * @param {React.ReactNode} [dayNode]
   * @returns React.ReactNode
   */
  export type DayRender = (
    dateRange: [Moment, Moment],
    dayNode: React.ReactNode,
  ) => React.ReactNode;
  /**
   * List of custom off days
   *
   * @type Moment
   */
  export type OffDays = Moment[];

  export type HighLightOffDays = { weekend?: boolean; customDates?: Date[] };
  /**
   * Customize localization.
   *
   * @default { language: "fa", zone: "Iran/Tehran" }
   */

  export type Locale = {
    /**
     * The language applied to picker
     *
     * @default "fa"
     */
    language?: Language;
  };
  /**
   * Custom format of return value
   *
   * @see https://momentjs.com/docs
   */
  export type Format = string | ((value: Moment) => string);
  /**
   * A render callback that add extra node above of default header
   *
   * @param {[Moment | null, Moment | null]} [current]
   * @param {React.ReactNode} [node]
   * @returns React.ReactNode
   */
  export type headerRender = (
    dateRange: [Moment | null, Moment | null],
    headerNode: React.ReactNode,
  ) => React.ReactNode;

  /**
   * A render callback that add custom panel
   *
   * @param {[PanelDate, PanelDate]} [data]
   * @param {React.ReactNode} [node]
   * @returns React.ReactNode
   */
  export type panelRender = (
    dateRange: [PanelDate, PanelDate],
    panelNode: React.ReactNode,
  ) => React.ReactNode;

  /**
   * A render callback that add custom panel
   *
   * @param {string[]} [labels]
   * @param {React.ReactNode} [node]
   * @returns React.ReactNode
   */
  export type dayLabelRender = (
    labels: string[],
    labelNode: React.ReactNode,
  ) => React.ReactNode;
}
