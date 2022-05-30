import { Callout, FocusTrapZone } from "@fluentui/react";
import { useRef, useState } from "react";
import { DropDownIcon } from "../../assets/Icons";
import {
  baseBtnSecondaryClassName,
  baseInputClassNameNoWidth,
  baseInputSlimClassNameNoWidth,
} from "../../constants/baseClasses";
import { Props } from "./Multiselect.props";
import { MultiselectInline } from "./MultiselectInline";

export const Multiselect = ({
  className,
  onSelectedChange,
  renderOptionDetails,
  options,
  slim,
  isButton,
  isFilterable,
  hasHeaderQuickLinks,
  children,
  ...rest
}: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [show, setShow] = useState(false);
  const classNames = [
    "pr-8 rounded relative text-left flex flex-row items-center",
    isButton && baseBtnSecondaryClassName,
    !isButton &&
      (slim ? baseInputSlimClassNameNoWidth : baseInputClassNameNoWidth),
    className,
  ].join(" ");

  return (
    <>
      <button
        className={classNames}
        ref={buttonRef}
        onClick={() => setShow(!show)}
        {...rest}
      >
        {children}
        <div className="absolute inset-y-0 right-0 flex items-center px-2 text-grey-700">
          <DropDownIcon />
        </div>
      </button>

      {show && (
        <Callout
          className="rounded overscroll-none"
          gapSpace={3}
          target={buttonRef}
          onDismiss={() => setShow(false)}
          isBeakVisible={false}
          setInitialFocus
        >
          <FocusTrapZone isClickableOutsideFocusTrap disableFirstFocus>
            <MultiselectInline
              className="h-72"
              options={options}
              isFilterable={isFilterable}
              hasHeaderQuickLinks={hasHeaderQuickLinks}
              hideOptionsBorder
              onSelectedChange={onSelectedChange}
              renderOptionDetails={renderOptionDetails}
            />
          </FocusTrapZone>
        </Callout>
      )}
    </>
  );
};
