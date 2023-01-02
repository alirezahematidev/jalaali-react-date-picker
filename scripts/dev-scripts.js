/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const prettier = require("prettier");

const APP_DIR = "src/App.tsx";
const INDEX_DIR = "src/index.tsx";

const develop_template = `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`;

const app_dir_template = `
function App() {
  return <div>app</div>;
}

export default App;`;

function createDevTemplate() {
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
}

createDevTemplate();
