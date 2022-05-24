import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import magnifyIcon from "../../assets/magnify.svg";
import {
  AutoDatasetWithHeading,
  FlowerDataset,
  FlowerDatasetCustomFormat,
} from "../../mock/stories.mock";
import { Singleselect } from "./Singleselect";

export default {
  // title: "components/Select/Singleselect",
  component: Singleselect,
  argTypes: {
    title: { control: "text", defaultValue: "Select an option" },
    placeholder: { control: "text", defaultValue: "Select an option" },
    options: {
      control: {
        type: "select",
        labels: {
          first: "Dataset with headings",
          second: "Dataset without headings",
          third: "Dataset with custom formatting",
        },
      },
      defaultValue: "first",
      options: ["first", "second", "third"],
      mapping: {
        first: AutoDatasetWithHeading,
        second: FlowerDataset,
        third: FlowerDatasetCustomFormat,
      },
    },
    icon: {
      control: {
        type: "select",
        labels: {
          first: "None",
          second: "Magnify icon",
        },
      },
      options: ["first", "second"],
      mapping: { first: undefined, second: magnifyIcon },
    },
    onSelected: { action: "onSelected" },
    onSearch: { action: "onSearch" },
    onChange: { action: "onChange" },
  },
} as ComponentMeta<typeof Singleselect>;

const Template: ComponentStory<typeof Singleselect> = ({
  options,
  ...args
}) => {
  return <Singleselect {...args} options={options} />;
};

export const Normal = Template.bind({});

export const Slim = Template.bind({});
Slim.args = {
  slim: true,
};
