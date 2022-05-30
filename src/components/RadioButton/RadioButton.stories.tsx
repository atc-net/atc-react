import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useState } from "react";
import { RadioButton } from "./RadioButton";

export default {
  component: RadioButton,
} as ComponentMeta<typeof RadioButton>;

const BoundTemplate: ComponentStory<typeof RadioButton> = ({
  onChecked,
  checked,
  ...args
}) => {
  const [rb, setRb] = useState(0);
  const onFirst = () => {
    setRb(0);
    onChecked?.();
  };
  return (
    <div>
      <RadioButton
        {...args}
        checked={checked || rb === 0}
        onChecked={onFirst}
      />
      <RadioButton
        id="second"
        checked={!checked && rb === 1}
        onChecked={() => setRb(1)}
      >
        Second
      </RadioButton>
      <RadioButton
        id="third"
        checked={!checked && rb === 2}
        onChecked={() => setRb(2)}
      >
        Third
      </RadioButton>
    </div>
  );
};

export const Bound = BoundTemplate.bind({});
Bound.args = {
  children: "First",
};

const UnboundTemplate: ComponentStory<typeof RadioButton> = ({
  onChecked,
  ...args
}) => {
  return (
    <div>
      <RadioButton
        name="g1"
        onChecked={onChecked}
        defaultChecked={true}
        {...args}
      />
      <RadioButton name="g1" onChecked={() => {}} id="second">
        Second
      </RadioButton>
      <RadioButton name="g1" onChecked={() => {}} id="third">
        Third
      </RadioButton>
    </div>
  );
};

export const Unbound = UnboundTemplate.bind({});
Unbound.args = {
  children: "First",
};
