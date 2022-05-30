import React, { useCallback, useMemo, useRef } from "react";
import { v4 } from "uuid";
import { Label } from "../Label/Label";
import { Props } from "./Checkbox.props";

export const Checkbox = ({
  id,
  children,
  onCheckedChange,
  className,
  title,
  disabled,
  ...rest
}: Props) => {
  const checkboxId = useMemo(() => id ?? v4(), [id]);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const classNames = [
    "inline-flex items-center cursor-pointer",
    className,
  ].join(" ");
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      checkboxRef.current?.focus();
      e.stopPropagation();
      onCheckedChange?.(e.target.checked);
    },
    [onCheckedChange]
  );

  return (
    <div title={title} className={classNames}>
      <input
        id={checkboxId}
        ref={checkboxRef}
        type="checkbox"
        onChange={onChange}
        disabled={disabled}
        className="flex-none m-1 form-checkbox h-4 w-4 cursor-pointer text-custom-700 border bg-white border-grey-300 hover:bg-grey-50 active:bg-grey-100 active:text-white rounded-md"
        {...rest}
      />
      <Label
        htmlFor={checkboxId}
        className="ml-2 select-none whitespace-nowrap cursor-pointer"
      >
        <span>{children}</span>
      </Label>
    </div>
  );
};
