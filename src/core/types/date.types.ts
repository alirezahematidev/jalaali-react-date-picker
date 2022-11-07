import { Moment as MomentType } from "moment-jalaali";
import * as React from "react";
import { ColorSchema, Date, Language, MonthNamedValue } from "./global.types";

export namespace DatePickerTypes {
  /**
   * Default type of date picker
   *
   * @type {Moment}
   */
  export type Moment = MomentType;
  /** Return type of month onChange */
  export type MonthValue = MonthNamedValue;

  export type PanelDate = {
    days: Date[];
    dayLabels: string[];
    selected?: Date;
  };

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
   * @param {Moment} [current]
   * @param {React.ReactNode} [node]
   * @returns React.ReactNode
   */
  export type RenderHeader = (
    current: Moment,
    node: React.ReactNode,
  ) => React.ReactNode;
  /**
   * A render callback that add custom footer below the panel
   *
   * @param {Moment} [current]
   * @param {React.ReactNode} [node]
   * @returns React.ReactNode
   */
  export type RenderFooter = (
    current: Moment,
    node: React.ReactNode,
  ) => React.ReactNode;

  /**
   * A render callback that add custom panel
   *
   * @param {PanelDate} [data]
   * @param {React.ReactNode} [node]
   * @returns React.ReactNode
   */
  export type RenderPanel = (
    data: PanelDate,
    node: React.ReactNode,
  ) => React.ReactNode;
}
