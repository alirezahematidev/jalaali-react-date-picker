/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

function resetApp() {
  const target = path.join(__dirname, "../src/App.tsx");

  const content = `function App() {
                        return <div>Dont leave anything here, it will be gone after commit.</div>;
                   }

                   export default App;
  `;

  prettier.resolveConfig(target).then((options) => {
    const formatted = prettier.format(content, {
      ...options,
      parser: "babel-ts",
      endOfLine: "auto",
      trailingComma: "all",
    });
    fs.writeFileSync(target, formatted);
  });
}

resetApp();
