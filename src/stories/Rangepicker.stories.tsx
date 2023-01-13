// organize-imports-ignore
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { RangePicker } from "../components";
import "../styles/index.css";

export default {
  title: "Example/RangePicker",
  component: RangePicker,
  argTypes: {
    locale: {
      control: {
        type: "select",
        labels: {
          fa: "Persian (Jalaali)",
          en: "English (Gregorian)",
        },
      },
      options: ["fa", "en"],
      defaultValue: "fa",
    },
    format: {
      defaultValue: "jYYYY-jMM-jDD",
      type: "string",
    },

    onChange: {
      name: "onChange",
    },
    onDayChange: {
      name: "onDayChange",
    },
    onMonthChange: {
      name: "onMonthChange",
    },
    onYearChange: {
      name: "onYearChange",
    },
    onModeChange: {
      name: "onModeChange",
    },
  },
} as ComponentMeta<typeof RangePicker>;

const Template: ComponentStory<typeof RangePicker> = (args) => (
  <RangePicker {...args} />
);

export const Component = Template.bind({});

Component.args = {
  highlightWeekend: true,
  loading: false,
  customColors: {
    background: "#ffffff",
    backgroundDisabled: "#dedede",
    backgroundHovered: "#f2f2f2",
    border: "#cacaca",
    borderFade: "#e0e0e0e7",
    dayLabelBackground: "#4b4949",
    highlight: "#18c5ff",
    primary: "#18c5ff",
    primaryFade: "#e1f7ff",
    text: "#000000",
    textNegative: "#f83959",
    textPrimary: "#ffffff",
    weekend: "#f83959",
  },
};
