import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Spinner } from "./Spinner";

export default {
  component: Spinner,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      values: [
        { name: "Dark", value: "#5A5A5A" },
        { name: "White", value: "#fff" },
      ],
    },
  },
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => (
  <Spinner {...args} />
);

export const Default = Template.bind({});
Default.args = {
  buttonSpinner: true,
  loading: true,
  darkColor: true,
};

export const Sunflower = Template.bind({});
Sunflower.args = {
  buttonSpinner: false,
  loading: true,
  darkColor: true,
};

export const Dark = Template.bind({});
Dark.args = {
  buttonSpinner: true,
  loading: true,
  darkColor: false,
};
Dark.parameters = { backgrounds: { default: "Dark" } };
