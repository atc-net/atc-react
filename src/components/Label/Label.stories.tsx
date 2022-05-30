import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Label } from "./Label";

export default {
  component: Label,
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => {
  return <Label {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  children: "Label",
};
