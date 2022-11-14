import moment, { Moment } from "moment-jalaali";
import { useState } from "react";
import { Picker } from "./components";
import { InputDatePicker } from "./components/dateInput";
import { RangePicker } from "./components/range";

function App() {
  const [date, setDate] = useState<Moment>();

  return (
    <div style={{ flexDirection: "row", display: "flex", gap: 16 }}>
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

      {/* <Picker locale={{ language: "en" }} /> */}
      {/* <Picker locale={{ language: "fa" }} /> */}
      <Picker
        locale={{ language: "fa" }}
        onMonthChange={(months) => console.log("onMonthChange", months)}
        onYearChange={(years) => console.log("onYearChange", years)}
        // disabledDates={(current) => current.isBefore(moment())}
      />
      <RangePicker
        locale={{ language: "fa" }}
        onMonthChange={(months) => console.log("onMonthChange", months)}
        onYearChange={(years) => console.log("onYearChange", years)}
        disabledDates={(current) => current.isBefore(moment())}
      />
    </div>
  );
}

export default App;
