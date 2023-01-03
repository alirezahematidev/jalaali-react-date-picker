import { DatePicker } from "./components";
import { InputDatePicker } from "./components/dateInput";
import { RangePicker } from "./components/range";
import { InputRangePicker } from "./components/rangeInput";

function App() {
  return (
    <div>
      <RangePicker />
      <DatePicker />
      <InputDatePicker />
      <InputRangePicker />
    </div>
  );
}

export default App;
