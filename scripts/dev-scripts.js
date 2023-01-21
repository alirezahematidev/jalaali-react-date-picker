/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const prettier = require("prettier");
const pkg = require("../package.json");

const APP_DIR = "src/App.tsx";
const INDEX_DIR = "src/index.tsx";

const develop_template = `import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
`;

const app_dir_template = `
import { InputDatePicker } from "./components/dateInput";

function App() {
  return (
    <div>
      <InputDatePicker />
    </div>
  );
}

export default App;`;

(function createDevTemplate() {
  if (!fs.existsSync("public")) {
    fs.mkdirSync("public");
    fs.writeFileSync("public/index.html", `<div id="root"></div>`);
  }

  pkg.homepage = "/";

  prettier.resolveConfig("package.json").then((options) => {
    const formatted = prettier.format(JSON.stringify(pkg), {
      parser: "json-stringify",
      ...options,
    });

    fs.writeFileSync("package.json", formatted);
  });

  prettier.resolveConfig(APP_DIR).then((options) => {
    const formatted = prettier.format(app_dir_template, {
      parser: "babel-ts",
      ...options,
    });

    fs.writeFileSync(APP_DIR, formatted);
  });

  prettier.resolveConfig(INDEX_DIR).then((options) => {
    const formatted = prettier.format(develop_template, {
      parser: "babel-ts",
      ...options,
    });

    fs.writeFileSync(INDEX_DIR, formatted);
  });
})();
