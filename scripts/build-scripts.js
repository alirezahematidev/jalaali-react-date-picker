/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const prettier = require("prettier");
const pkg = require("../package.json");

const APP_DIR = "src/App.tsx";
const INDEX_DIR = "src/index.tsx";

const build_template = `import { DatePicker } from "./components/date";
import { InputDatePicker } from "./components/dateInput";
import { RangePicker } from "./components/range";
import { InputRangePicker } from "./components/rangeInput";

import {
  DatePickerProps,
  InputDatePickerProps,
  InputRangePickerProps,
  RangePickerProps,
} from "./core/interfaces";

export { DatePicker, RangePicker, InputDatePicker, InputRangePicker };
export type {
  InputDatePickerProps,
  InputRangePickerProps,
  RangePickerProps,
  DatePickerProps,
};`;

(function createBuildTemplate() {
  if (fs.existsSync(APP_DIR)) {
    fs.rmSync(APP_DIR);
  }
  if (fs.existsSync("public")) {
    fs.rmSync("public", { recursive: true, force: true });
  }
  pkg.homepage =
    "https://github.com/alirezahematidev/jalaali-react-date-picker#readme";

  prettier.resolveConfig("package.json").then((options) => {
    const formatted = prettier.format(JSON.stringify(pkg), {
      parser: "json-stringify",
      ...options,
    });

    fs.writeFileSync("package.json", formatted);
  });

  prettier.resolveConfig(INDEX_DIR).then((options) => {
    const formatted = prettier.format(build_template, {
      parser: "babel-ts",
      ...options,
    });

    fs.writeFileSync(INDEX_DIR, formatted);
  });
})();
