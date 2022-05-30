import { HTMLAttributes, ReactNode } from "react";

export interface Props extends HTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  htmlFor?: string;
  smallFont?: boolean;
}
