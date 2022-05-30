import { ISelectableOption } from "@fluentui/react";
import { HTMLAttributes, ReactNode } from "react";

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  slim?: boolean;
  options: ISelectableOption[];
  onSelectedChange: (options: ISelectableOption[], isSelected: boolean) => void;
  renderOptionDetails?: (option: ISelectableOption) => ReactNode;
  isFilterable?: boolean;
  hasHeaderQuickLinks?: boolean;
  isButton?: boolean;
  children?: ReactNode;
}

export interface InlineProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  options: ISelectableOption[];
  hideOptionsBorder?: boolean;
  onSelectedChange: (options: ISelectableOption[], isSelected: boolean) => void;
  renderOptionDetails?: (option: ISelectableOption) => ReactNode;
  isFilterable?: boolean;
  hasHeaderQuickLinks?: boolean;
}
