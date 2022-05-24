import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { ButtonTheme } from "./ButtonTheme";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loadingText?: string;
  theme: ButtonTheme;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
