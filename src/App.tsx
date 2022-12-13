import { InputDatePicker } from "./components/dateInput";
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
      <InputDatePicker />
    </div>
  );
}

export default App;
