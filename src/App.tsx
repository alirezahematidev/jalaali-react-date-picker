import moment, { Moment } from "moment-jalaali";
import { useState } from "react";
import { InputRangePicker } from "./components/rangeInput";

function App() {
  const [date, setdate] = useState<[Moment, Moment]>([
    moment().add(1, "day"),
    moment().add(5, "day"),
  ]);
  return (
    <div
      style={{
        // direction: "rtl",
        // // padding: 50,
        // marginTop: 450,
        // marginLeft: 100,
        // gap: 20,
        display: "flex",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        // alignItems: "flex-start",
      }}
    >
      <InputRangePicker
        onChange={(value) => {
          console.log("value", value);
          value && setdate(value);
        }}
        defaultValue={[moment(), moment().add(2, "day")]}
        locale={"fa"}
        weekend={true}
        value={date}
      />

      {/* <DatePicker
        onChange={(value) => {
          console.log("value", value);
        }}
      /> */}
      {/* <InputRangePicker placement="right" /> */}
    </div>
  );
}

export default App;
