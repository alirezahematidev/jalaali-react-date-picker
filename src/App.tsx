import { InputDatePicker } from "./components/dateInput";
import { RangePicker } from "./components/range";
import "./core/styles/index.css";

function App() {
  return (
    <div
      style={{
        direction: "rtl",
        padding: 50,
        gap: 20,
        display: "flex",
      }}
    >
      <InputDatePicker />
      <RangePicker locale={{ language: "en" }} />
    </div>
  );
}

export default App;
