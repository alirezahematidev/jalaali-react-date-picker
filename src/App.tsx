import { InputRangePicker } from "./components/rangeInput";

function App() {
  return (
    <div style={{ marginLeft: 800, marginTop: 400 }}>
      <div
        style={{
          width: 500,
          padding: 24,
          background: "#ccc",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <InputRangePicker />
        <div
          style={{
            width: "100%",
            height: 36,
            background: "red",
            marginBlock: 8,
          }}
        />
      </div>
    </div>
  );
}

export default App;
