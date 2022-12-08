import { DatePicker } from "./components";
import { RangePicker } from "./components/range";
import "./styles/index.scss";

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
      <DatePicker />
      <RangePicker />
    </div>
  );
}

export default App;
