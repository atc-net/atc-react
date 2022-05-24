import { InputHTMLAttributes, ReactNode } from "react";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  disabled?: boolean;
}
