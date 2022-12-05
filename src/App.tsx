import { Moment } from "moment";
import { useState } from "react";
import { DatePicker } from "./components";
import "./styles/index.scss";

function App() {
  const [date, setDate] = useState<Moment>();

  return (
    <div
      style={{
        direction: "rtl",
        padding: 50,
      }}
    >
      <DatePicker />
    </div>
  );
}

export default App;
