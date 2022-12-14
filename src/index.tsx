import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./core/styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// export { DatePicker, RangePicker, InputDatePicker, InputRangePicker };
// export type {
//   DatePickerProps,
//   RangePickerProps,
//   InputDatePickerProps,
//   InputRangePickerProps,
// };
