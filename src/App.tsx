import { Picker } from "./components";

function App() {
  return (
    <div style={{ flexDirection: "row", display: "flex", gap: 16 }}>
      <Picker isJalaali={false} />
      <Picker isJalaali={true} />
    </div>
  );
}

export default App;
