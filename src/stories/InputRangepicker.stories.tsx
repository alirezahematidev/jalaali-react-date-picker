// organize-imports-ignore
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { InputRangePicker } from "../components";
import "../styles/index.css";

export default {
  title: "Example/InputRangePicker",
  component: InputRangePicker,
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

    responsive: {
      control: {
        type: "select",
      },
      options: ["desktop", "mobile", "auto"],
      defaultValue: "auto",
    },
    placement: {
      control: {
        type: "select",
      },
      options: ["top", "bottom", "right", "left"],
    },
    format: {
      defaultValue: "jYYYY-jMM-jDD",
      type: "string",
    },
    onOpenChange: {
      type: "function",
    },
  },
} as ComponentMeta<typeof InputRangePicker>;

const Template: ComponentStory<typeof InputRangePicker> = (args) => (
  <InputRangePicker {...args} />
);

export const Component = Template.bind({});

Component.args = {
  open: false,
  error: false,
  disabled: false,
  presets: true,
};
