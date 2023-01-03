import { InputRangePicker } from "./components/rangeInput";

function App() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: 0,
        margin: 0,
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          height: 100,
          overflow: "hidden",
          marginLeft: 100,
          marginTop: 100,
        }}
      >
        <InputRangePicker placement="top" />
      </div>
      {/* <div style={{ minHeight: 2000 }}>s</div> */}
    </div>
  );
}

export default App;
