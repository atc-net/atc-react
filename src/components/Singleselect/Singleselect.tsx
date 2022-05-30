import { Callout, FocusZone, FocusZoneTabbableElements } from "@fluentui/react";
import { useCallback, useMemo, useRef, useState } from "react";
import { DropDownIcon } from "../../assets/Icons";
import {
  baseInputClassName,
  baseInputSlimClassName,
} from "../../constants/baseClasses";
import {
  Props,
  SingleselectOption,
  SingleselectOptionType,
} from "./Singleselect.props";

const pageSize = 50;

interface OptionWrapper {
  option: SingleselectOption;
  isHeading?: boolean;
  heading?: SingleselectOption;
  headingCountFiltered?: number;
  headingCountTotal?: number;
}

export const Singleselect = ({
  id,
  className,
  calloutClassName,
  slim,
  options,
  icon,
  hideCaretDown,
  autoFilter = true,
  autoSelectOnMatch = true,
  onSelected,
  onSearch,
  onChange,
  value,
  ...rest
}: Props) => {
  const calloutContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const [show, setShow] = useState(false);
  const [text, setText] = useState(value?.toString() ?? "");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(pageSize);
  const classNames = [
    icon ? "pl-8" : "",
    hideCaretDown ? "" : "pr-8",
    "rounded text-left flex flex-row items-center",
    slim ? baseInputSlimClassName : baseInputClassName,
    className,
  ].join(" ");

  const onOpenCallout = useCallback(() => setShow(!show), [show]);
  const onDismissCallout = useCallback(() => {
    setShow(false);
    setFilter("");
    inputRef.current?.focus();
  }, []);

  const onChangeFilter = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      e.preventDefault();
      setText(e.target.value);
      if (autoFilter) {
        setFilter(e.target.value);
      }

      setPage(pageSize);
      const match = options.find(
        (option) =>
          option.text &&
          !option.type && // Only normal or undefined
          option.text.toLowerCase() === e.target.value?.toLowerCase()
      );
      if (match) {
        if (autoSelectOnMatch) {
          onSelected(match);
        }

        if (inputRef.current) {
          setText(match.text);
        }
      }
    },
    [onSelected, onChange, autoSelectOnMatch, autoFilter, options]
  );

  const onInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.code) {
        case "ArrowDown":
        case "ArrowUp":
          e.stopPropagation();
          e.preventDefault();
          setShow(true);
          firstButtonRef.current?.focus();
          break;
        case "Escape":
          if (show) {
            e.stopPropagation();
            setShow(false);
          }
          break;
        case "Tab":
          break;
        default:
          setShow(true);
          break;
      }
    },
    [show]
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
    e.preventDefault();
    onSearch?.(text.trim());
  };

  const onScroll = useCallback(
    (e: React.UIEvent<HTMLElement>): void => {
      const clientRects = calloutContainerRef.current?.getClientRects();
      if (clientRects && clientRects.length > 0) {
        const buffer =
          e.currentTarget.scrollHeight -
          e.currentTarget.scrollTop -
          2 * clientRects[0].height;
        if (buffer < 0 && page < options.length) {
          setPage(page + pageSize);
        }
      }
    },
    [page, options, setPage]
  );

  const visibleOptions = useMemo(() => {
    let currentHeading: OptionWrapper;

    // Wrap options and update total + isHeading
    const allWrappings = options.map((option) => {
      if (
        option.type === SingleselectOptionType.Heading ||
        option.type === SingleselectOptionType.HeadingAutoCount
      ) {
        currentHeading = {
          option,
          isHeading: true,
          headingCountFiltered: 0,
          headingCountTotal: 0,
        };
        return currentHeading;
      }

      if (currentHeading) {
        currentHeading.headingCountTotal =
          (currentHeading.headingCountTotal ?? 0) + 1;
      }

      return { option, heading: currentHeading?.option };
    });

    // All headings + normal that matches filter
    const filteredWrappings = allWrappings.filter(
      (wrap) =>
        !filter ||
        wrap.option.type ||
        wrap.option.text?.toLowerCase().includes(filter.toLowerCase())
    );

    // Update header content count
    filteredWrappings.forEach((wrap) => {
      if (wrap.isHeading) {
        wrap.headingCountFiltered = 0;
        currentHeading = wrap;
      } else if (currentHeading) {
        currentHeading.headingCountFiltered =
          (currentHeading.headingCountFiltered ?? 0) + 1;
      }
    });

    return filteredWrappings
      .filter((wrap) => !(wrap.isHeading && wrap.headingCountFiltered === 0))
      .slice(0, page);
  }, [filter, page, options]);

  const renderNormal = (wrap: OptionWrapper, isFirst: boolean) => {
    const option = wrap.option;
    const onSelect = () => {
      onSelected(option);
      setFilter("");
      setShow(false);
      inputRef.current?.focus();
    };

    const optionClassName = [
      "w-full text-left whitespace-nowrap py-1 px-3 outline-none focus:bg-menu-active active:bg-menu-active hover:bg-menu-hover",
      option.className,
    ].join(" ");

    if (isFirst) {
      return (
        <button
          className={optionClassName}
          ref={firstButtonRef}
          onClick={onSelect}
          onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
            switch (e.code) {
              case "ArrowUp":
                e.stopPropagation();
                e.preventDefault();
                inputRef.current?.focus();
                break;
            }
          }}
          onFocus={() => setText(option.text)}
        >
          {option.text}
        </button>
      );
    }

    return (
      <button
        className={optionClassName}
        onClick={onSelect}
        onFocus={() => setText(option.text)}
      >
        {option.text}
      </button>
    );
  };

  const renderHeader = (wrap: OptionWrapper) => {
    const headerClassName = [
      "flex flex-row justify-between w-full text-left whitespace-nowrap py-1 px-3 bg-menu-header text-blue-900",
      wrap.option.className,
    ].join(" ");

    let extra = "";
    if (wrap.option.type === SingleselectOptionType.HeadingAutoCount) {
      if (wrap.headingCountFiltered === wrap.headingCountTotal) {
        extra = ` (${wrap.headingCountTotal})`;
      } else {
        extra = ` (${wrap.headingCountFiltered}/${wrap.headingCountTotal})`;
      }
    }
    return (
      <div className={headerClassName}>
        <span className="text-sm font-bold">{wrap.option.text}</span>
        <span className="text-sm font-bold">{extra}</span>
      </div>
    );
  };

  const renderOption = (
    wrap: OptionWrapper,
    index: number,
    array: OptionWrapper[]
  ) => {
    if (wrap.isHeading) {
      return (
        <li
          className="sticky top-0 bg-white"
          key={`${wrap.option.key ?? wrap.option.text}_${index}`}
        >
          {renderHeader(wrap)}
        </li>
      );
    }

    const isFirst = array.findIndex((wrap) => !wrap.isHeading) === index;
    return (
      <li key={`${wrap.option.key ?? wrap.option.text}_${index}`}>
        {renderNormal(wrap, isFirst)}
      </li>
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <div id={id} className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              tabIndex={-1}
              className="p-1 focus:outline-none focus:shadow-outline"
              onClick={onSubmit}
            >
              <img src={icon} alt="Search" />
            </button>
          </div>
        )}
        {!hideCaretDown && (
          <div className="absolute pointer-events-none inset-y-0 right-0 flex items-center px-2 text-grey-700">
            <DropDownIcon />
          </div>
        )}
        <input
          ref={inputRef}
          className={classNames}
          onClick={onOpenCallout}
          onKeyDown={onInputKeyDown}
          placeholder="Select filter"
          onChange={onChangeFilter}
          value={text}
          {...rest}
        ></input>
        <Callout
          className="rounded overscroll-none"
          hidden={!show}
          gapSpace={3}
          target={inputRef}
          calloutMinWidth={inputRef.current?.clientWidth}
          onDismiss={onDismissCallout}
          isBeakVisible={false}
        >
          <FocusZone
            handleTabKey={FocusZoneTabbableElements.all}
            isCircularNavigation={true}
          >
            <div
              onScroll={onScroll}
              ref={calloutContainerRef}
              className={`max-h-72 overflow-y-auto ${calloutClassName}`}
            >
              <ul>{visibleOptions.map(renderOption)}</ul>
            </div>
          </FocusZone>
        </Callout>
      </div>
    </form>
  );
};
