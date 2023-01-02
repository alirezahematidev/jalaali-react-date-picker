import { InputRangePicker } from "./components/rangeInput";

function App() {
  return (
    <div
      style={{
        // direction: "rtl",
        // // padding: 50,
        // marginTop: 450,
        // marginLeft: 100,
        // gap: 20,
        display: "flex",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        // alignItems: "flex-start",
      }}
    >
      <InputRangePicker placement="right" />
      {/* <InputRangePicker placement="right" /> */}
    </div>
  );
}

export default App;
