import { Moment } from "moment";
import { useState } from "react";
import { Select } from "./components/popup";
import { RangeInput } from "./components/rangeInput";
import "./styles/index.scss";

function App() {
  const [date, setDate] = useState<[Moment, Moment]>();
  console.log("date", date);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#ccc",
        padding: 500,
        paddingTop: 1000,
        // paddingLeft: 1000,
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
      {/* 
      <RangePicker
        locale={{ language: "fa" }}
        disabledDates={(current) => {
          return current.isBefore(moment());
        }}
        format="jMM/jDD/jYYYY"
      /> */}
      {/* <DatePicker locale={{ language: "en" }} /> */}
      {/* <DatePicker locale={{ language: "fa" }} /> */}
      <Select>
        <RangeInput value={date} onChange={(date) => setDate(date)} />
      </Select>
    </div>
  );
}

export default App;
