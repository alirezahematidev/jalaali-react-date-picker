import Day from "./components/day";
import { useSetColors } from "./core/hooks/useSetColors";
import { ColorSchema } from "./core/types/global.types";
import "./styles/index.scss";

function App() {
  const colors: ColorSchema = {};

  useSetColors(colors);

  return (
    <div style={{ padding: 50 }}>
      <Day id="1" day={1} monthId="1" />
    </div>
  );
}

export default App;
