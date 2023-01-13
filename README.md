[![NPM](https://nodei.co/npm/jalaali-react-date-picker.png)](https://nodei.co/npm/jalaali-react-date-picker/)

# Jalaali React Datepicker

Welcome to our date picker for React applications! This package offers a customizable and localized solution for selecting dates in your projects. With support for the Jalaali calendar system, our date picker allows you to easily implement date selection in your React projects, whether you need to select a single date, or range of dates. Get started now by installing the package and integrating it into your React code.

[![Version][version-badge]][package]
[![NPM Downloads][dw-badge]][package]

[dw-badge]: https://img.shields.io/npm/dw/jalaali-react-date-picker
[version-badge]: https://img.shields.io/npm/v/jalaali-react-date-picker
[package]: https://www.npmjs.com/package/jalaali-react-date-picker

## Installation

To install jalaali-react-date-picker, you will need to have [npm](https://npmjs.com) or [yarn](https://yarnpkg.com) installed on your system. Once you have one of these package managers set up, you can install jalaali-react-date-picker by running the following command:

```bash
  npm install --save jalaali-react-date-picker
```

or

```bash
  yarn add jalaali-react-date-picker
```

This will install the latest version of jalaali-react-date-picker and add it as a dependency to your project.

## Usage/Examples

First, import the necessary styles at top of your application:

```javascript
import "jalaali-react-date-picker/lib/styles/index.css";
```

# DatePicker

The **DatePicker** component is a standalone calendar picker that allows the user to select a single date.

```javascript
import { DatePicker } from "jalaali-react-date-picker";

function App() {
  return <DatePicker />;
}
```

# RangePicker

The **RangePicker** component is a calendar picker that allows the user to select a range of dates.

```javascript
import { RangePicker } from "jalaali-react-date-picker";

function App() {
  return <RangePicker />;
}
```

# InputDatePicker

The **InputDatePicker** component is a calendar picker that is displayed as an input field. The user can select a single date by clicking the input field and selecting a date from the calendar picker.

```javascript
import { InputDatePicker } from "jalaali-react-date-picker";

function App() {
  return <InputDatePicker />;
}
```

# InputRangePicker

The **InputRangePicker** component is a calendar picker that is displayed as two input fields. The user can select a range of dates by clicking on either of the input fields and selecting a date from the calendar picker.

```javascript
import { InputRangePicker } from "jalaali-react-date-picker";

function App() {
  return <InputRangePicker />;
}
```

## Live Demo Examples

To see demo examples, run the following command:

```bash
  npm run storybook or yarn storybook
```

## Running Tests

To run tests, run the following command:

```bash
  npm run test or yarn test
```

## Features

- Full support for React and server-side frameworks like Next.js: The package is designed to work seamlessly with these technologies, allowing you to easily incorporate it into your project.

- Custom date highlighting: With this feature, you can define specific dates and highlight them with any color you choose. This is useful for highlighting important dates, events, or deadlines.

- Complete style customization: The package allows you to fully customize the styles, including colors and style overrides. This means you can match the calendar to the look and feel of your project.

- Support for both Gregorian and Jalaali (Shamsi) date formats: The package provides support for both formats, giving you the flexibility to use the one that best fits your needs.

## Props

The **jalaali-react-date-picker** package offers a wide range of customizable props for each of the components. Here is a list of the available props for each component:

# DatePicker

| Property           |                                  Type                                   | Description                                                                                                                           |
| :----------------- | :---------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------ |
| `value`            |                            `Moment \| null`                             | The currently selected date.                                                                                                          |
| `defaultValue`     |                            `Moment \| null`                             | To set default value, if `value` is `undefined` or `null`, the date picker will show default value.                                   |
| `onChange`         |          `(date: Moment \| null, dateString: string) => void`           | Callback function which will be executed when date changes.                                                                           |
| `onDayChange`      |                         `(day:number) => void`                          | Callback function which will be executed when day changes.                                                                            |
| `onMonthChange`    |                      `(month:MonthValue) => void`                       | Callback function which will be executed when month changes.                                                                          |
| `onYearChange`     |                         `(year:number) => void`                         | Callback function which will be executed when year changes.                                                                           |
| `format`           |                  `string \| (value:Moment) => string`                   | The format is which the selected date should be displayed. Uses moment.js format strings.                                             |
| `locale`           |                                `Locale`                                 | The locale to be used for localization, while default locale is `fa`.                                                                 |
| `disabledDates`    |                      `(current:Moment) => boolean`                      | Callback function that can specify the date that cannot be selected                                                                   |
| `onModeChange`     |                          `(mode:Mode) => void`                          | Callback function which will be executed when calendar mode changes.                                                                  |
| `panelRender`      |     `(date:PanelDate,panelNode:React.ReactNode) => React.ReactNode`     | Callback render function used to render custom node for calendar panel component.                                                     |
| `footerRender`     | `(current:Date \| null, footerNode:React.ReactNode) => React.ReactNode` | Callback render function used to render custom node for footer component.                                                             |
| `headerRender`     | `(current:Date \| null, headerNode:React.ReactNode) => React.ReactNode` | Callback render function used to render custom node for header component.                                                             |
| `dayLabelRender`   |    `(labels:string[],labelNode:React.ReactNode) => React.ReactNode`     | Callback render function used to render custom for day labels component.                                                              |
| `highlightDays`    |                 `Moment[] \| (date:Moment) => boolean`                  | The `highlightDays` can be used to determines which dates should be highlighted. it accepts array of `moment` or a callback function. |
| `highlightWeekend` |                                `boolean`                                | If `highlightWeekend` set to `true`, its turn weekend days to highlighted. Default is `true`.                                         |
| `customColors`     |                              `ColorSchema`                              | The `customColors` can be used to overrides the default colors.                                                                       |
| `nextIcon`         |                            `React.ReactNode`                            | custom icon for next month                                                                                                            |
| `prevIcon`         |                            `React.ReactNode`                            | custom icon for previous month                                                                                                        |
| `superNextIcon`    |                            `React.ReactNode`                            | custom icon for next year                                                                                                             |
| `superPrevIcon`    |                            `React.ReactNode`                            | custom icon for previous year                                                                                                         |
| `loading`          |                                `boolean`                                | If `true`, renders loading component in calendar instead of caledar panel                                                             |
| `loadingIndicator` |                            `React.ReactNode`                            | Set custom loading indicator                                                                                                          |
| `style`            |                          `React.CSSProperties`                          | styles for root element of calendar panel                                                                                             |
| `className`        |                                `string`                                 | class for root element of calendar panel                                                                                              |

# RangePicker

| Property           |                                            Type                                             | Description                                                                                                                           |
| :----------------- | :-----------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------ |
| `value`            |                                  `[Moment,Moment] \| null`                                  | The currently selected range date date.                                                                                               |
| `defaultValue`     |                                      `[Moment,Moment]`                                      | To set default value, if `value` is `undefined` or `null`, the range picker will show default value.                                  |
| `onChange`         |               `(date: [Moment,Moment], dateString: [string,string]) => void`                | Callback function which will be executed when range dates changes.                                                                    |
| `onDayChange`      |                              `(days:[number,number]) => void`                               | Callback function which will be executed when days changes.                                                                           |
| `onMonthChange`    |                          `(month:[MonthValue,MonthValue]) => void`                          | Callback function which will be executed when months changes.                                                                         |
| `onYearChange`     |                              `(year:[number, number]) => void`                              | Callback function which will be executed when years changes.                                                                          |
| `format`           |                       `string \| (value:[Moment, Moment]) => string`                        | The format is which the selected range dates should be displayed. Uses moment.js format strings. Default is `jYYYY-jMM-jDD`           |
| `locale`           |                                          `Locale`                                           | The locale to be used for localization, while default is `fa`.                                                                        |
| `disabledDates`    |                                `(current:Moment) => boolean`                                | Callback function that can specify the dates that cannot be selected                                                                  |
| `onModeChange`     |                                    `(mode:Mode) => void`                                    | Callback function which will be executed when calendar mode changes.                                                                  |
| `panelRender`      |       `(date:[PanelRange, PanelRange],panelNode:React.ReactNode) => React.ReactNode`        | Callback render function used to render custom node for calendar panel component.                                                     |
| `headerRender`     | `(current:[Moment, Moment \| null] \| null, headerNode:React.ReactNode) => React.ReactNode` | Callback render function used to render custom node for header component.                                                             |
| `dayLabelRender`   |              `(labels:string[],labelNode:React.ReactNode) => React.ReactNode`               | Callback render function used to render custom for day labels component.                                                              |
| `highlightDays`    |                           `Moment[] \| (date:Moment) => boolean`                            | The `highlightDays` can be used to determines which dates should be highlighted. it accepts array of `moment` or a callback function. |
| `highlightWeekend` |                                          `boolean`                                          | If `highlightWeekend` set to `true`, its turn weekend days to highlighted. Default is `true`.                                         |
| `customColors`     |                                        `ColorSchema`                                        | The `customColors` can be used to overrides the default colors.                                                                       |
| `nextIcon`         |                                      `React.ReactNode`                                      | custom icon for next month                                                                                                            |
| `prevIcon`         |                                      `React.ReactNode`                                      | custom icon for previous month                                                                                                        |
| `superNextIcon`    |                                      `React.ReactNode`                                      | custom icon for next year                                                                                                             |
| `superPrevIcon`    |                                      `React.ReactNode`                                      | custom icon for previous year                                                                                                         |
| `loading`          |                                          `boolean`                                          | If `true`, renders loading component in calendar instead of caledar panel                                                             |
| `loadingIndicator` |                                      `React.ReactNode`                                      | Set custom loading indicator                                                                                                          |
| `style`            |                                    `React.CSSProperties`                                    | styles for root element of calendar panel                                                                                             |
| `className`        |                                          `string`                                           | class for root element of calendar panel                                                                                              |

# InputDatePicker

| Property            |                         Type                         | Description                                                                                                          |
| :------------------ | :--------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------- |
| `value`             |                   `Moment \| null`                   | The currently selected date.                                                                                         |
| `defaultValue`      |                   `Moment \| null`                   | To set default value, if `value` is `undefined` or `null`, the date picker will show default value.                  |
| `open`              |                      `boolean`                       | To set `open` the popup calendar.                                                                                    |
| `disabled`          |                      `boolean`                       | To set `disable` the popup calendar                                                                                  |
| `error`             |                      `boolean`                       | If `true`, the input will indicate an error                                                                          |
| `presets`           |                      `boolean`                       | The preset range dates for quick selection. Default is `true`.                                                       |
| `renderInput`       |          `(field: FieldProps) => ReactNode`          | Customize date picker input render.                                                                                  |
| `prefixIcon`        |                  `React.ReactNode`                   | Input custom prefix icon.                                                                                            |
| `suffixIcon`        |                  `React.ReactNode`                   | Input custom suffix icon                                                                                             |
| `placement`         |           `top \| bottom \| right \| left`           | The position where the popup calendar box pops up.                                                                   |
| `format`            |         `string \| (value:Moment) => string`         | The format is which the selected date should be displayed. Uses moment.js format strings. Default is `jYYYY-jMM-jDD` |
| `locale`            |                       `Locale`                       | The locale to be used for localization, while default is `fa`.                                                       |
| `getPopupContainer` |    `HTMLElement \| (() => HTMLElement) \| string`    | The mounted node for popup calendar.                                                                                 |
| `disabledDates`     |            `(current:Moment) => boolean`             | Callback function that can specify the date that cannot be selected                                                  |
| `customColors`      |                    `ColorSchema`                     | The `customColors` can be used to overrides the default colors.                                                      |
| `onChange`          | `(date: Moment \| null, dateString: string) => void` | Callback function which will be executed when date changes.                                                          |
| `onDayChange`       |                `(day:number) => void`                | Callback function which will be executed when day changes.                                                           |
| `onMonthChange`     |             `(month:MonthValue) => void`             | Callback function which will be executed when month changes.                                                         |
| `onYearChange`      |               `(year:number) => void`                | Callback function which will be executed when year changes.                                                          |
| `onOpenChange`      |              `(open: boolean) => void`               | Callback function, can be executed whether the popup calendar is popped up or closed.                                |
| `pickerProps`       |             [picker props](#pickerprops)             | Object containing options for changing the picker itself.                                                            |
| `onClear`           |                     `() => void`                     | Callback function, can be executed when the clear icon is clicked.                                                   |
| `wrapperClassName`  |                       `string`                       | class for wrapper element of inputs.                                                                                 |
| `wrapperStyle`      |                `React.CSSProperties`                 | styles for wrapper element of inputs.                                                                                |
|                     |

## PickerProps

| Property           |                                  Type                                   | Description                                                                                                                           |
| :----------------- | :---------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------ |
| `panelRender`      |     `(date:PanelDate,panelNode:React.ReactNode) => React.ReactNode`     | Callback render function used to render custom node for calendar panel component.                                                     |
| `footerRender`     | `(current:Date \| null, footerNode:React.ReactNode) => React.ReactNode` | Callback render function used to render custom node for footer component.                                                             |
| `headerRender`     | `(current:Date \| null, headerNode:React.ReactNode) => React.ReactNode` | Callback render function used to render custom node for header component.                                                             |
| `dayLabelRender`   |    `(labels:string[],labelNode:React.ReactNode) => React.ReactNode`     | Callback render function used to render custom for day labels component.                                                              |
| `highlightDays`    |                 `Moment[] \| (date:Moment) => boolean`                  | The `highlightDays` can be used to determines which dates should be highlighted. it accepts array of `moment` or a callback function. |
| `highlightWeekend` |                                `boolean`                                | If `highlightWeekend` set to `true`, its turn weekend days to highlighted. Default is `true`.                                         |
| `loading`          |                                `boolean`                                | If `true`, renders loading component in calendar instead of caledar panel                                                             |
| `loadingIndicator` |                            `React.ReactNode`                            | Set custom loading indicator                                                                                                          |
| `onModeChange`     |                          `(mode:Mode) => void`                          | Callback function which will be executed when calendar mode changes.                                                                  |
| `style`            |                          `React.CSSProperties`                          | styles for root element of calendar panel                                                                                             |
| `className`        |                                `string`                                 | class for root element of calendar panel                                                                                              |

# InputRangePicker

| Property            |                              Type                              | Description                                                                                                                 |
| :------------------ | :------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------- |
| `value`             |                       `[Moment,Moment]`                        | The currently selected range date date.                                                                                     |
| `defaultValue`      |                       `[Moment,Moment]`                        | To set default value, if `value` is `undefined` or `null`, the range picker will show default value.                        |
| `open`              |                           `boolean`                            | To set `open` the popup calendar.                                                                                           |
| `disabled`          |                           `boolean`                            | To set `disable` the popup calendar                                                                                         |
| `error`             |                           `boolean`                            | If `true`, the input will indicate an error                                                                                 |
| `presets`           |                           `boolean`                            | The preset range dates for quick selection. Default is `true`.                                                              |
| `placeholder`       |                       `[string,string]`                        | The placeholder of date inputs.                                                                                             |
| `prefixIcon`        |                       `React.ReactNode`                        | Input custom prefix icon.                                                                                                   |
| `suffixIcon`        |                       `React.ReactNode`                        | Input custom suffix icon                                                                                                    |
| `placement`         |                `top \| bottom \| right \| left`                | The position where the popup calendar box pops up.                                                                          |
| `getPopupContainer` |         `HTMLElement \| (() => HTMLElement) \| string`         | The mounted node for popup calendar.                                                                                        |
| `disabledDates`     |                 `(current:Moment) => boolean`                  | Callback function that can specify the date that cannot be selected                                                         |
| `format`            |         `string \| (value:[Moment, Moment]) => string`         | The format is which the selected range dates should be displayed. Uses moment.js format strings. Default is `jYYYY-jMM-jDD` |
| `locale`            |                            `Locale`                            | The locale to be used for localization, while default is `fa`.                                                              |
| `responsive`        |                  `desktop \| mobile \| auto`                   | To set responsive, the range picker component is responsed and optimized to device it runs on. Default set to `auto`.       |
| `separator`         |                       `React.ReactNode`                        | Set separator between inputs.                                                                                               |
| `customColors`      |                         `ColorSchema`                          | The `customColors` can be used to overrides the default colors.                                                             |
| `rangeProps`        |                   [range props](#rangeprops)                   | Object containing options for changing the range picker itself.                                                             |
| `onChange`          | `(date: [Moment,Moment], dateString: [string,string]) => void` | Callback function which will be executed when range dates changes.                                                          |
| `onDayChange`       |                `(days:[number,number]) => void`                | Callback function which will be executed when days changes.                                                                 |
| `onMonthChange`     |           `(month:[MonthValue,MonthValue]) => void`            | Callback function which will be executed when months changes.                                                               |
| `onYearChange`      |               `(year:[number, number]) => void`                | Callback function which will be executed when years changes.                                                                |
| `onOpenChange`      |                   `(open: boolean) => void`                    | Callback function, can be executed whether the popup calendar is popped up or closed.                                       |
| `onClear`           |                          `() => void`                          | Callback function, can be executed when the clear icon is clicked.                                                          |
| `wrapperStyle`      |                     `React.CSSProperties`                      | styles for wrapper element of inputs.                                                                                       |
| `wrapperClassName`  |                            `string`                            | class for wrapper element of inputs.                                                                                        |

## RangeProps

| Property           |                                  Type                                   | Description                                                                                                                           |
| :----------------- | :---------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------ |
| `panelRender`      |     `(date:PanelDate,panelNode:React.ReactNode) => React.ReactNode`     | Callback render function used to render custom node for calendar panel component.                                                     |
| `headerRender`     | `(current:Date \| null, headerNode:React.ReactNode) => React.ReactNode` | Callback render function used to render custom node for header component.                                                             |
| `dayLabelRender`   |    `(labels:string[],labelNode:React.ReactNode) => React.ReactNode`     | Callback render function used to render custom for day labels component.                                                              |
| `highlightDays`    |                 `Moment[] \| (date:Moment) => boolean`                  | The `highlightDays` can be used to determines which dates should be highlighted. it accepts array of `moment` or a callback function. |
| `highlightWeekend` |                                `boolean`                                | If `highlightWeekend` set to `true`, its turn weekend days to highlighted. Default is `true`.                                         |
| `loading`          |                                `boolean`                                | If `true`, renders loading component in calendar instead of caledar panel                                                             |
| `loadingIndicator` |                            `React.ReactNode`                            | Set custom loading indicator                                                                                                          |
| `onModeChange`     |                          `(mode:Mode) => void`                          | Callback function which will be executed when calendar mode changes.                                                                  |
| `style`            |                          `React.CSSProperties`                          | styles for root element of calendar panel                                                                                             |
| `className`        |                                `string`                                 | class for root element of calendar panel                                                                                              |

## Authors

- [@alirezahematidev](https://github.com/alirezahematidev)
- [@mohammadgharouni](https://github.com/mohammadgharouni)
- [@samimideveloper](https://github.com/samimideveloper)

This authors section lists the names and github profiles of the individuals who have contributed to the project. It is a good way to acknowledge the work and efforts of the people involved in the project, and can also make it easier for users to contact the authors if they have questions or want to contribute to the project.

## Dependencies

[moment.js](https://momentjs.com) - A powerful and flexible JavaScript library for manipulating dates and times. We use Moment.js to handle date formatting and manipulation in our project.

## License

[MIT](https://choosealicense.com/licenses/mit/)
