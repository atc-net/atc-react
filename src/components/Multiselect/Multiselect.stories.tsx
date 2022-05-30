import {
  ISelectableOption,
  SelectableOptionMenuItemType,
} from "@fluentui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useEffect } from "react";
import {
  SelectableAutoDatasetWithHeading,
  SelectableFlowerDataset,
} from "../../mock/stories.mock";
import { Multiselect } from "./Multiselect";
import { MultiselectInline } from "./MultiselectInline";

export default {
  // title: "components/Select/Multiselect",
  component: Multiselect,
  argTypes: {
    children: { control: "text", defaultValue: "Select any options" },
    title: { control: "text", defaultValue: "Tooltip" },
    placeholder: { control: "text", defaultValue: "Placeholder" },
    className: { control: "text", readOnly: true },
    options: {
      control: {
        type: "select",
        labels: {
          first: "Dataset with headings",
          second: "Dataset without headings",
        },
      },
      defaultValue: "first",
      options: ["first", "second"],
      mapping: {
        first: SelectableAutoDatasetWithHeading,
        second: SelectableFlowerDataset,
      },
    },
    renderOptionDetails: {
      control: {
        type: "select",
        labels: {
          first: "None",
          second: "Render extra details",
        },
      },
      defaultValue: "first",
      options: ["first", "second"],
      mapping: {
        first: undefined,
        second: (option: ISelectableOption) => {
          switch (option.itemType) {
            case SelectableOptionMenuItemType.SelectAll:
              return "All";
            case SelectableOptionMenuItemType.Divider:
              return "Divider";
            case SelectableOptionMenuItemType.Header:
              return "Heading";
            default:
              return "Extra";
          }
        },
      },
    },
    onSelectedChange: { action: "onSelected" },
  },
} as ComponentMeta<typeof Multiselect>;

const Template: ComponentStory<typeof Multiselect> = ({
  onSelectedChange,
  options,
  ...args
}) => {
  useEffect(() => {
    setSelectedOptions(options);
  }, [options]);
  const [selectedOptions, setSelectedOptions] = React.useState(options);
  const onTemplateSelectedChange = (
    templateOptions: ISelectableOption[],
    isSelected: boolean
  ) => {
    onSelectedChange?.(templateOptions, isSelected); // Storybook action
    const updatedOptions = selectedOptions.map((o) =>
      templateOptions.find((option) => option.text === o.text) != null
        ? { ...o, selected: isSelected }
        : o
    );
    setSelectedOptions(updatedOptions);
  };

  return (
    <Multiselect
      onSelectedChange={onTemplateSelectedChange}
      options={selectedOptions}
      {...args}
    />
  );
};

export const Normal = Template.bind({});
Normal.args = {};

const InlineTemplate: ComponentStory<typeof MultiselectInline> = ({
  onSelectedChange,
  options,
  ...args
}) => {
  useEffect(() => {
    setSelectedOptions(options);
  }, [options]);
  const [selectedOptions, setSelectedOptions] = React.useState(options);
  const onTemplateSelectedChange = (
    templateOptions: ISelectableOption[],
    isSelected: boolean
  ) => {
    onSelectedChange?.(templateOptions, isSelected); // Storybook action
    const updatedOptions = selectedOptions.map((o) =>
      templateOptions.find((option) => option.text === o.text) != null
        ? { ...o, selected: isSelected }
        : o
    );
    setSelectedOptions(updatedOptions);
  };
  return (
    <MultiselectInline
      onSelectedChange={onTemplateSelectedChange}
      options={selectedOptions}
      {...args}
    />
  );
};

export const Inline = InlineTemplate.bind({});
Inline.args = {
  className: "h-72",
};
