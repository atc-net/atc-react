import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Button } from "./Button";
import { ButtonTheme } from "./ButtonTheme";

export default {
  component: Button,
  argTypes: {
    theme: {
      type: {
        name: "enum",
        value: [
          ButtonTheme.Primary,
          ButtonTheme.Secondary,
          ButtonTheme.Tertiary,
        ],
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  theme: ButtonTheme.Primary,
  children: "Click Me",
};

export const Secondary = Template.bind({});
Secondary.args = {
  theme: ButtonTheme.Secondary,
  children: "Click Me",
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  theme: ButtonTheme.Tertiary,
  children: "Click Me",
};

// export const Demo = {
//   play: async ({ args, canvasElement }) => {
//     const canvas = within(canvasElement);
//     await userEvent.click(canvas.getByRole('button'));
//     await expect(args.onClick).toHaveBeenCalled();
//   },
// };
