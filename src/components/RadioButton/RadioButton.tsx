import React, { useCallback, useMemo, useRef } from "react";
import { v4 } from "uuid";
import { Label } from "../Label/Label";
import { Props } from "./RadioButton.props";

export const RadioButton = ({
  id,
  children,
  onChecked,
  className,
  title,
  ...rest
}: Props) => {
  const radioId = useMemo(() => id ?? v4(), [id]);
  const radioRef = useRef<HTMLInputElement>(null);
  const classNames = ["flex items-center cursor-pointer", className].join(" ");
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      radioRef.current?.focus();
      e.stopPropagation();
      onChecked?.();
    },
    [onChecked]
  );

  return (
    <div title={title} className={classNames}>
      <input
        id={radioId}
        ref={radioRef}
        type="radio"
        onChange={onChange}
        className="flex-none m-1 form-checkbox h-4 w-4 cursor-pointer text-custom-700 border bg-white border-grey-300 hover:bg-grey-50 active:bg-grey-100 active:text-white rounded-md"
        {...rest}
      />
      <Label
        htmlFor={radioId}
        className="ml-2 select-none whitespace-nowrap cursor-pointer"
      >
        <span>{children}</span>
      </Label>
    </div>
  );
};
