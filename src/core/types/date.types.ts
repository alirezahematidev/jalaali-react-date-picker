import { Moment as MomentType } from "moment-jalaali";
import * as React from "react";
import { ColorSchema, MonthNamedValue } from "./global.types";

export namespace DatePickerTypes {
  /**
   * Default type of date picker
   *
   * @type {Moment}
   */
  export type Moment = MomentType;
  /** Return type of month onChange */
  export type MonthValue = MonthNamedValue;
  /**
   * Override all default colors
   *
   * @param {Colors} [colors]
   */
  export type Colors = ColorSchema;
  /**
   * Type of date value
   *
   * @param {Moment} [value]
   */
  export type Value = Moment | undefined | null;
  /**
   * Type of date default value
   *
   * @param {DefaultValue} [defaultValue]
   */
  export type DefaultValue = Value;
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
   * @param {Moment} [date]
   * @param {string} [dateString]
   */
  export type OnChange = (date: Value, dateString: string) => void;
  /**
   * Callback that return current day
   *
   * @param {Moment} [day]
   */
  export type OnDayChange = (day: number) => void;
  /**
   * Callback that return current month
   *
   * @param {Moment} [month]
   */
  export type OnMonthChange = (month: MonthValue) => void;
  /**
   * Callback that return current year
   *
   * @param {Moment} [year]
   */
  export type OnYearChange = (year: number) => void;
  /**
   * A callback that can determine what dates should be disabled
   *
   * @param {Moment} [current]
   * @returns Boolean | ValueRange
   */
  export type DisabledDates = (current: Moment) => boolean | DisabledValueRange;
  /**
   * A render callback that allows to customize day node
   *
   * @param {Moment} [date]
   * @param {React.ReactNode} [dayNode]
   * @returns React.ReactNode
   */
  export type DayRender = (
    date: Moment,
    dayNode: React.ReactNode,
  ) => React.ReactNode;
  /**
   * List of custom off days
   *
   * @type Moment
   */
  export type OffDays = Moment[];
  /**
   * A callback that returns today date
   *
   * @returns Value
   */
  export type Today = () => Value;
  /**
   * A boolean that convert datepicker to jalaali format
   *
   * @default true
   */
  export type IsJalaali = boolean;
  /**
   * A list of locales that customize language and time zone based on.
   *
   * @default ["fa", "en"]
   */
  export type Locales = string[];
  /**
   * Custom format of return value
   *
   * @link https://momentjs.com/docs
   */
  export type Format = string | ((value: Moment) => string);
  /**
   * A render callback that add extra node above of default header
   *
   * @param {Moment} [current]
   * @returns React.ReactNode
   */
  export type RenderExtraHeader = (current: Moment) => React.ReactNode;
  /**
   * A render callback that add custom footer below the panel
   *
   * @param {Moment} [current]
   * @returns React.ReactNode
   */
  export type RenderFooter = (current: Moment) => React.ReactNode;
}
