import { InputRangePicker } from "./components/rangeInput";

function App() {
  return (
    <div
      style={{
        // direction: "rtl",
        // // padding: 50,
        // marginTop: 450,
        // gap: 20,
        display: "flex",
        justifyContent: "flex-start",
        // alignItems: "flex-start",
      }}
    >
      <InputRangePicker placement="bottom" />
      {/* <InputRangePicker placement="right" /> */}
    </div>
  );
}

export default App;
