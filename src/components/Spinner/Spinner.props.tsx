import { HTMLAttributes } from "react";

export interface Props extends HTMLAttributes<HTMLDivElement> {
  loading: boolean;
  absolute?: boolean;
  spinnerClassName?: string;
  buttonSpinner?: boolean;
  darkColor?: boolean;
}
