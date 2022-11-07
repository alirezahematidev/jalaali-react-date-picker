import { Picker } from "./components";

function App() {
  return (
    <div style={{ flexDirection: "row", display: "flex", gap: 16 }}>
      <Picker locale={{ language: "en" }} />
    </div>
  );
}

export default App;
