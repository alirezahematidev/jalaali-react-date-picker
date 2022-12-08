import { InputDatePicker } from "./components/dateInput";
import { InputRangePicker } from "./components/rangeInput";
import "./styles/index.scss";

function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: 500,
      }}
    >
      <InputDatePicker />
      <InputRangePicker />
    </div>
  );
}

export default App;
