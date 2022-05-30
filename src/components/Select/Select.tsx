import { DropDownIcon } from "../../assets/Icons";
import {
  baseInputClassName,
  baseInputSlimClassName,
} from "../../constants/baseClasses";
import { Props } from "./Select.props";

export const Select = (props: Props) => {
  const { className, slim, children, ...rest } = props;
  const classNames = [
    "pr-8",
    slim ? baseInputSlimClassName : baseInputClassName,
    className,
  ].join(" ");
  return (
    <div className="relative">
      <select className={classNames} {...rest}>
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-grey-700">
        <DropDownIcon />
      </div>
    </div>
  );
};
