import { DatePicker } from "./components";

function App() {
  return (
    <div>
      <DatePicker />
    </div>
  );
}

export default App;

const a = [
  "Moment",
  "MonthValue",
  "MonthRangeValue",
  "PanelDate",
  "Mode",
  "Colors",
  "RangeValue",
  "DefaultRangeValue",
  "OnChange",
  "OnDayChange",
  "OnMonthChange",
  "OnYearChange",
  "OnModeChange",
  "DisabledDates",
  "DayRender",
  "HighlightDays",
  "Weekend",
  "Locale",
  "Format",
  "HeaderRender",
  "PanelRender",
  "DayLabelRender",
];
console.log(
  a
    .map((item) => item.split("")[0].toLowerCase() + item.slice(1, item.length))
    .join("\n"),
);
