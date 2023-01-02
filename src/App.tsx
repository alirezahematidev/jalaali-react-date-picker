import { InputDatePicker } from "./components/dateInput";

function App() {
  return (
    <div
      style={{
        direction: "rtl",
        // padding: 50,
        marginTop: 450,
        gap: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <InputDatePicker placement="top" />
      {/* <InputRangePicker placement="right" /> */}
    </div>
  );
}

export default App;
