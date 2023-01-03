# React Jalaali Datepicker

An advanced jalaali datepicker for Reactjs library.

[![Version][version-badge]][package]
[![MIT License][license-badge]][license]

[version-badge]: https://img.shields.io/npm/v/jalaali-react-date-picker
[package]: https://www.npmjs.com/package/jalaali-react-date-picker
[license-badge]: https://img.shields.io/npm/l/jalaali-react-date-picker
[license]: https://opensource.org/licenses/MIT

[Documentation](https://alirezahematidev.github.io/react-jalaali-date-picker/)

## Installation

Install jalaali-react-date-picker with npm

```bash
  npm install jalaali-react-date-picker
```

Install jalaali-react-date-picker with yarn

```bash
  yarn add jalaali-react-date-picker
```

## Running Tests

To run tests, run the following command

```bash
  npm run test or yarn test
```

## Usage/Examples

Do not forget to import index.css at top of your application

```javascript
import "jalaali-react-date-picker/lib/styles/index.css";
import { DatePicker } from "jalaali-react-date-picker";

function App() {
  return <DatePicker />;
}
```

```javascript
import "jalaali-react-date-picker/lib/styles/index.css";
import { RangePicker } from "jalaali-react-date-picker";

function App() {
  return <RangePicker />;
}
```

```javascript
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputDatePicker } from "jalaali-react-date-picker";

function App() {
  return <InputDatePicker />;
}
```

```javascript
import "jalaali-react-date-picker/lib/styles/index.css";
import { InputRangePicker } from "jalaali-react-date-picker";

function App() {
  return <InputRangePicker />;
}
```

## Features

- Completely support on React and and server side frameworks like Nextjs.
- Easily define custom dates and highlight them with any color you want.
- Full styles customization (style overrides, colors and etc)
- Support both gregorian and jalaali (Shamsi) date format

## props

| Property            | Type                                                        | Description                                                                             |
| :------------------ | :---------------------------------------------------------- | :-------------------------------------------------------------------------------------- | -------------------- |
| `value`             | `Moment`                                                    | To set date                                                                             |
| `defaultValue`      | `Moment`                                                    | To set default date, if date is null or undefined, the date will be set                 |
| `onChange`          | `(date: Value, dateString: string) => void`                 | Callback function, can be executed when the selected date is changing                   |
| `onDayChange`       | `(day: number) => void`                                     | Callback function, can be executed then return day when the selected date is changing   |
| `onMonthChange`     | `(month: MonthValue) => void`                               | Callback function, can be executed then return month when the selected date is changing |
| `onYearChange`      | `(year: number) => void`                                    | Callback function, can be executed then return year when the selected date is changing  |
| `disabledDates`     | `(current: Moment) => boolean \| DisabledValueRange`        | To specify the date that cannot be selected                                             |
| `dayRender`         | `(date: Moment,dayNode:React.ReactNode) => React.ReactNode` | Render custom day component in panel                                                    |
| `renderExtraHeader` | `(current:Moment) => React.ReactNode`                       | Render extra header in panel                                                            |
| `renderFooter`      | `(current:Moment) => React.ReactNode`                       | Render extra footer in panel                                                            |
| `locale`            | `fa                                                         | en`                                                                                     | Locale configuration |

## Authors

- [@alirezahematidev](https://github.com/alirezahematidev)
- [@mohammadgharouni](https://github.com/mohammadgharouni)
- [@samimideveloper](https://github.com/samimideveloper)

## Using Third Party

[momentjs](https://momentjs.com)

## License

[MIT](https://choosealicense.com/licenses/mit/)
