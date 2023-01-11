import moment, { Moment } from "moment-jalaali";
import { useState } from "react";
import { InputRangePicker } from "./components/rangeInput";

function App() {
  const [date, setdate] = useState<[Moment, Moment | null] | null>(null);
  return (
    <div>
      <InputRangePicker
        onChange={(date) => setdate(date)}
        value={date}
        onDayChange={(day) => console.log("day", day)}
        onYearChange={(day) => console.log("year", day)}
        onMonthChange={(day) => console.log("month", day)}
        onOpenChange={(day) => console.log("open", day)}
        highlightWeekend={false}
        presets={false}
        disabledDates={(v) => v.isBefore(moment())}
        rangeProps={{
          onModeChange: (mode) => console.log("mode", mode),
          highlightDays: (day) => day.isSame(moment().add(1, "day"), "day"),
        }}
        locale="en"
        onClear={() => console.log("clear")}
      />
    </div>
  );
}

export default App;
