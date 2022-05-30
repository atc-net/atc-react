import { InputHTMLAttributes, ReactNode } from "react";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
  onChecked: () => void;
}
