import { DatePicker } from "./components";
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
    </div>
  );
}

export default App;
