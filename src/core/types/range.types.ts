import { ColorSchema, MonthNamedValue } from "./global.types";
import { Moment as MomentType } from "moment-jalaali";

export namespace RangePickerTypes {
  /**
   * Default type of date picker
   *
   * @type {Moment}
   */
  export type Moment = MomentType;
  /** Return type of month onChange */
  export type MonthValue = [MonthNamedValue, MonthNamedValue];
  /**
   * Override all default colors
   *
   * @param {Colors} [colors]
   */
  export type Colors = ColorSchema;
  /**
   * Type of date value
   *
   * @param {Value} [value]
   */
  export type Value = [Moment, Moment] | undefined | null;
  /**
   * Type of days value
   *
   * @param {[number, number]} [DayRange]
   */
  export type DayRange = [number, number];

  /**
   * Type of months value
   *
   * @param {[MonthValue, MonthValue]} [MonthRange]
   */
  export type MonthRange = [MonthValue, MonthValue];

  /**
   * Type of months value
   *
   * @param {[MonthValue, MonthValue]} [MonthRange]
   */
  export type YearRange = [number, number];

  /**
   * Type of date value
   *
   * @param {ValueString} [ValueString]
   */
  export type ValueString = [string, string] | undefined | null;
  /**
   * Type of date default value
   *
   * @param {DefaultValue} [defaultValue]
   */
  export type DefaultValue = Value;
  /** Type of range dates */
  export type DisabledValueRange = [Moment | null, Moment?];
  /**
   * Callback that return current value
   *
   * @param {Moment} [date]
   * @param {ValueString} [dateString]
   */
  export type OnChange = (date: Value, dateString: ValueString) => void;
  /**
   * Callback that return current day
   *
   * @param {DayRange} [days]
   */
  export type OnDayChange = (days: DayRange) => void;
  /**
   * Callback that return current month
   *
   * @param {MonthRange} [months]
   */
  export type OnMonthChange = (months: MonthRange) => void;
  /**
   * Callback that return current year
   *
   * @param {YearRange} [years]
   */
  export type OnYearChange = (years: YearRange) => Value;
  /**
   * A callback that can determine what dates should be disabled
   *
   * @param {Moment} [current]
   * @returns Boolean | ValueRange
   */
  export type DisabledDates = (current: Value) => boolean | DisabledValueRange;
  /**
   * A render callback that allows to customize day node
   *
   * @param {Moment} [date]
   * @param {ReactNode} [dayNode]
   * @returns ReactNode
   */
  export type DayRender = (
    date: Value,
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
