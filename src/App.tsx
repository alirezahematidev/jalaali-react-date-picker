import { Picker } from "./components";

function App() {
  return (
    <div style={{ flexDirection: "row", display: "flex", gap: 16 }}>
      <Picker locale={{ language: "fa" }} />
      {/* <Picker locale={{ language: "fa" }} /> */}
    </div>
  );
}

export default App;
