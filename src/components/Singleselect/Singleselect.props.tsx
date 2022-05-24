import { InputHTMLAttributes } from "react";

export enum SingleselectOptionType {
  Normal = 0, // default
  Heading,
  HeadingAutoCount,
}

export interface SingleselectOption<T = any> {
  key?: string;
  text: string;
  data?: T;
  className?: string;
  type?: SingleselectOptionType;
}

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  calloutClassName?: string;
  slim?: boolean;
  options: SingleselectOption[];
  icon?: string;
  hideCaretDown?: boolean;
  autoFilter?: boolean;
  autoSelectOnMatch?: boolean;
  onSearch?: (text: string) => void;
  onSelected: (option: SingleselectOption) => void;
}
