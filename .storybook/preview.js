export const parameters = {
  actions: { argTypesRegex: "^on.*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        "Introduction",
        "Example",
        ["DatePicker", "RangePicker", "InputDatePicker", "InputRangePicker"],
      ],
    },
  },
};
