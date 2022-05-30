import { ReactNode, SelectHTMLAttributes } from "react";

export interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  slim?: boolean;
}
