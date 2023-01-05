import { DatePicker } from "./components";

function App() {
  return (
    <div style={{ width: 500, marginLeft: 300 }}>
      <DatePicker locale="fa" />
      <div style={{ height: 400 }} />
      <DatePicker locale="en" />
    </div>
  );
}

export default App;
