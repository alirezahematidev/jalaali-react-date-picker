import { Moment } from "moment";
import { useState } from "react";
import { DatePicker } from "./components";
import { InputDatePicker } from "./components/dateInput";
import { Popup } from "./components/popup";
import "./styles/index.scss";

function App() {
  const [date, setDate] = useState<Moment>();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: 500,
        paddingTop: 1000,
      }}
    >
      {/* <Picker
        locale={{ language: "fa" }}
        value={date}
        onChange={(value) => value && setDate(value)}
        onDayChange={(day) => console.log({ dayFa: day })}
        onMonthChange={(month) => console.log({ monthFa: month })}
        onYearChange={(year) => console.log({ yearFa: year })}
        disabledDates={(day) => {
          return day.isBetween(moment().subtract(5, "day"), moment());
        }}
      /> */}

      {/* <button onClick={() => setDate(moment().add(6, "months"))}>
        add 6 months
      </button> */}

      {/* <RangePicker
        locale={{ language: "fa" }}
        disabledDates={(current) => {
          return current.isBefore(moment());
        }}
        format="jMM/jDD/jYYYY"
      /> */}
      {/* <DatePicker locale={{ language: "en" }} /> */}
      {/* <DatePicker locale={{ language: "fa" }} /> */}
      <InputDatePicker />
      {/* <Picker locale={{ language: "fa" }} /> */}
      {/* <Picker
        locale={{ language: "fa" }}
        onMonthChange={(months) => console.log("onMonthChange", months)}
        onYearChange={(years) => console.log("onYearChange", years)}
      /> */}
      {/* <RangePicker
        locale={{ language: "fa" }}
        onMonthChange={(months) => console.log("onMonthChange", months)}
        onYearChange={(years) => console.log("onYearChange", years)}
      /> */}
    </div>
  );
}

export default App;
