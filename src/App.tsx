import { Moment } from "moment";
import { useState } from "react";
import { InputRangePicker } from "./components/rangeInput";
import "./styles/index.scss";

function App() {
  const [date, setDate] = useState<Moment>();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: 500,
      }}
    >
      <InputRangePicker />
    </div>
  );
}

export default App;
