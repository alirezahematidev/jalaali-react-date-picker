import { Moment } from "moment";
import { useState } from "react";
import { DatePicker } from "./components";
import { Select } from "./components/popup";
import "./styles/index.scss";

function App() {
  const [date, setDate] = useState<Moment>();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#ccc",
        padding: 500,
        paddingTop: 1000,
        paddingLeft: 1000,
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
      <Select>
        <input
          style={{
            width: 400,
            height: 30,
            outline: "none",
            background: "none",
            appearance: "none",
            padding: 0,
            border: " 1px solid #444",
          }}
        />
      </Select>
      {/* <Picker locale={{ language: "fa" }} /> */}
      {/* <Picker
        locale={{ language: "fa" }}
        onMonthChange={(months) => console.log("onMonthChange", months)}
        onYearChange={(years) => console.log("onYearChange", years)}
        // disabledDates={(current) => current.isBefore(moment())}
      />
      <div>
        <RangePicker
          locale={{ language: "fa" }}
          onMonthChange={(months) => console.log("onMonthChange", months)}
          onYearChange={(years) => console.log("onYearChange", years)}
          disabledDates={(current) =>
            current.isBetween(moment().subtract(10, "day"), moment())
          }
        />
        <RangeInput />
      </div>
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
