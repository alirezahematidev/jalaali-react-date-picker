
# React Jalaali Datepicker

An advanced jalaali date or range picker that supports on all of Javascript frameworks, Specially React and React Native



[![Version][version-badge]][package]
[![MIT License][license-badge]][license]

[version-badge]: https://img.shields.io/npm/v/jalaali-react-date-picker
[package]: https://www.npmjs.com/package/jalaali-react-date-picker
[license-badge]: https://img.shields.io/npm/l/jalaali-react-date-picker
[license]: https://opensource.org/licenses/MIT


[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/gbraad)

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

```javascript
import DatePicker from 'jalaali-react-date-picker'

function App() {
  return <DatePicker />
}
```


## Features

- Full support on React and React Native libraries
- Full styles customization (style overrides, colors and etc)
- Support jalaali (Shamsi) date mode format


## props

| Property | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `value` | `Moment` | To set date  |
| `defaultValue` | `Moment` | To set default date, if date is null or undefined, the date will be set  |
| `onChange` | `(date: Value, dateString: string) => void` | Callback function, can be executed when the selected date is changing  |
| `onDayChange` | `(day: number) => void` | Callback function, can be executed then return day when the selected date is changing  |
| `onMonthChange` | `(month: MonthValue) => void` | Callback function, can be executed then return month when the selected date is changing  |
| `onYearChange` | `(year: number) => void` | Callback function, can be executed then return year when the selected date is changing  |
| `disabledDates` | `(current: Moment) => boolean \| DisabledValueRange` | To specify the date that cannot be selected  |
| `dayRender` | `(date: Moment,dayNode:React.ReactNode) => React.ReactNode` | 	Render custom day component in panel  |
| `renderExtraHeader` | `(current:Moment) => React.ReactNode` | 	Render extra header in panel  |
| `renderFooter` | `(current:Moment) => React.ReactNode` | 	Render extra footer in panel  |
| `isJalaali` | `boolean` | 	The jalaali mode of picker  |



## Authors

- [@alirezahematidev](https://github.com/alirezahematidev)
- [@mohammadgharouni](https://github.com/mohammadgharouni)
- [@samimideveloper](https://github.com/samimideveloper)


## Using Third Party

[momentjs](https://momentjs.com)


## License

[MIT](https://choosealicense.com/licenses/mit/)