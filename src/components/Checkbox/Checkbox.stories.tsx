import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useEffect, useState } from "react";
import { Checkbox } from "./Checkbox";

export default {
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const BoundTemplate: ComponentStory<typeof Checkbox> = ({
  checked,
  onCheckedChange,
  ...args
}) => {
  useEffect(() => {
    setTemplateChecked(checked);
  }, [checked]);
  const [templateChecked, setTemplateChecked] = useState(checked);
  const onChange = (isChecked: boolean) => {
    setTemplateChecked(isChecked);
    onCheckedChange && onCheckedChange(isChecked);
  };
  return (
    <Checkbox {...args} checked={templateChecked} onCheckedChange={onChange} />
  );
};

export const Bound = BoundTemplate.bind({});
Bound.args = {
  children: "Toggle Me",
};

const UnboundTemplate: ComponentStory<typeof Checkbox> = (args) => {
  return <Checkbox {...args} defaultChecked={true} />;
};

export const Unbound = UnboundTemplate.bind({});
Unbound.args = {
  children: "Toggle Me",
};
