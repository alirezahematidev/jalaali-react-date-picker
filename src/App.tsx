import { InputDatePicker } from "./components/dateInput";
import { InputRangePicker } from "./components/rangeInput";

function App() {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "flex-end",
      }}
    >
      <InputDatePicker />
      <InputRangePicker />
    </div>
  );
}

export default App;
