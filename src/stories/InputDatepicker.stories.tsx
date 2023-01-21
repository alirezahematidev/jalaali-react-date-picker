// organize-imports-ignore
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { InputDatePicker } from "../components";
import "../styles/index.css";

export default {
  title: "Example/InputDatePicker",
  component: InputDatePicker,
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
  },
} as ComponentMeta<typeof InputDatePicker>;

const Template: ComponentStory<typeof InputDatePicker> = (args) => {
  return <InputDatePicker {...args} />;
};

export const Component = Template.bind({});

Component.args = {
  open: false,
  error: false,
  disabled: false,
  presets: true,
};
