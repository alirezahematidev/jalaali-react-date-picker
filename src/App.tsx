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
      <InputDatePicker />
    </div>
  );
}

export default App;
