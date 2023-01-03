import { InputDatePicker } from "./components/dateInput";
import { InputRangePicker } from "./components/rangeInput";

function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 400,
      }}
    >
      <InputDatePicker />
      <InputRangePicker />
    </div>
  );
}

export default App;
