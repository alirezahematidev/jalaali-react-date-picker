import { Moment } from "moment-jalaali";
import { ReactNode } from "react";

type ColorObject = {
  primary: string;
  onPrimary: string;
  text: string;
  secondary: string;
  highlight: string;
  onSecondary: string;
  disabledText: string;
  background: string;
  disabledBackground: string;
  light: string;
};

type MonthObject = {
  name: string;
  value: number;
};

/**
 * @namespace Types
 * @description all types of date picker
 */
export namespace Types {
  /**
   * @description Default type of date picker
   * @type {Moment or string}
   */
  export type MomentString = Moment | string;
  /**
   * @description return type of month onChange
   */
  export type MonthValue = MonthObject;
  /**
   * @param {Colors=} colors
   * @description override all default colors
   */
  export type Colors = ColorObject;
  /**
   * @param {Value=} value
   * @description type of date value
   */
  export type Value = MomentString | undefined | null;
  /**
   * @param {DefaultValue=} defaultValue
   * @description type of date default value
   */
  export type DefaultValue = Value;
  /**
   * @description type of range dates
   * @example ['2022-11-02T14:40:44.181Z','2022-11-05T14:40:44.181Z']
   */
  export type ValueRange = [MomentString | null, MomentString?];
  /**
   * @description onChange callback that return current value
   * @param {MomentString=} value
   * @returns Value
   */
  export type OnChange = (value: MomentString) => Value;
  /**
   * @description onDayChange callback that return current day
   * @param {MomentString=} value
   * @returns Value
   */
  export type OnDayChange = (value: MomentString) => Value;
  /**
   * @description onMonthChange callback that return current month
   * @param {MomentString=} value
   * @returns MonthValue
   */
  export type OnMonthChange = (value: MomentString) => MonthValue;
  /**
   * @description onYearChange callback that return current year
   * @param {MomentString=} value
   * @returns Value
   */
  export type OnYearChange = (value: MomentString) => Value;
  /**
   * @description A callback that can determine what dates should be disabled
   * @param {MomentString=} current
   * @returns boolean | ValueRange
   */
  export type DisabledDates = (current: MomentString) => boolean | ValueRange;
  /**
   * @description A render callback that allows to customize day node
   * @param {MomentString=} date
   * @param {ReactNode=} dayNode
   * @returns ReactNode
   */
  export type DayRender = (date: MomentString, dayNode: ReactNode) => ReactNode;
  /**
   * @description list of custom off days
   * @type MomentString
   */
  export type OffDays = MomentString[];
  /**
   * @description A callback that returns today date
   * @returns Value
   */
  export type Today = () => Value;
  /**
   * @description A boolean that convert datepicker to jalaali format
   * @default true
   */
  export type IsJalaali = boolean;
  /**
   * @description A list of locales that customize language and time zone based on.
   * @default ['fa','en']
   */
  export type Locales = string[];
  /**
   * @description custom format of return value
   * @link https://momentjs.com/docs
   */
  export type Format = string;
  /**
   * @description A render callback that add extra node above of default header
   * @param {MomentString=} current
   * @returns ReactNode
   */
  export type RenderExtraHeader = (current: MomentString) => ReactNode;
  /**
   * @description A render callback that add custom footer below the panel
   * @param {MomentString=} current
   * @returns ReactNode
   */
  export type RenderFooter = (current: MomentString) => ReactNode;
}
