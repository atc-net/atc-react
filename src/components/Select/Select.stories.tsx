import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";
import { Select } from "./Select";

export default {
  // title: "components/Select/Select",
  component: Select,
  argTypes: {
    onChange: { action: "onChange" },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = ({ onChange, ...args }) => {
  const [value, setValue] = useState("a");
  const onTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  };
  return (
    <Select {...args} value={value} onChange={onTemplateChange}>
      <option value="a">A</option>
      <option value="b">B</option>
      <option value="c">C</option>
    </Select>
  );
};

export const Normal = Template.bind({});

export const Slim = Template.bind({});
Slim.args = {
  slim: true,
};
