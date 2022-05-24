import {
  FocusZone,
  FocusZoneTabbableElements,
  SelectableOptionMenuItemType,
} from "@fluentui/react";
import { useCallback, useMemo, useState } from "react";
import { baseInputClassName } from "../../constants/baseClasses";
import { format } from "../../utils/formatting";
import { InlineProps } from "./Multiselect.props";
import { MultiselectOptions } from "./MultiselectOptions";

interface IHeaderButton {
  filter: string;
  displayName: string;
  selected: number;
}

export const MultiselectInline = ({
  className,
  onSelectedChange,
  renderOptionDetails,
  options,
  hideOptionsBorder,
  isFilterable,
  hasHeaderQuickLinks,
  ...rest
}: InlineProps) => {
  const [filter, setFilter] = useState<string>();
  const [headerFilter, setHeaderFilter] = useState<string>("");
  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setFilter(e.target.value);
    },
    [setFilter]
  );

  const borderClassNames = hideOptionsBorder
    ? ""
    : "py-2 pl-2 border bg-white border-grey-300 text-grey-700 focus-within:border-grey-500 rounded";
  const wrapperClassNames = ["overflow-y-auto overscroll-none", className].join(
    " "
  );
  const filterClassName = ["mb-2", hideOptionsBorder && "p-1"].join(" ");

  const headers: IHeaderButton[] = useMemo(() => {
    const allHeader = "";
    const headerCount = new Map<string, number>();
    let currentHeader: string | undefined;
    let selected: number = 0;
    headerCount.set(allHeader, 0);
    options.forEach((option) => {
      if (option.itemType === SelectableOptionMenuItemType.Header) {
        currentHeader = option.text;
        headerCount.set(currentHeader, 0);
      } else if (option.selected) {
        selected++;
        headerCount.set(allHeader, selected);
        if (currentHeader) {
          const currentHeaderCountMap = headerCount.get(currentHeader) ?? 0;
          headerCount.set(currentHeader, currentHeaderCountMap + 1);
        }
      }
    });

    const headers: IHeaderButton[] = [];
    headerCount.forEach((selected: number, filter: string) => {
      headers.push({
        filter,
        displayName: filter === allHeader ? "All" : filter,
        selected,
      });
    });

    // Magic max aligned with height
    return headers.slice(0, 11);
  }, [options]);

  const renderHeaderButton = useCallback(
    (header: IHeaderButton, index: number) => (
      <button
        key={index}
        className={[
          "py-1 pl-3 pr-2 flex items-center justify-between font-bold grow border",
          "focus:outline-none focus-visible:border focus-visible:border-grey-500",
          headerFilter === header.filter
            ? "hover:bg-white bg-white border-white text-blue-900 cursor-default"
            : "hover:bg-grey-100 hover:border-grey-100 bg-grey-50 border-grey-50 border-r-grey-100",
          index !== 0 ? "border-t-grey-100" : "",
        ].join(" ")}
        onClick={() => setHeaderFilter(header.filter)}
      >
        {header.displayName}
        {header.selected > 0 && (
          <span
            title={`Selected in ${header.displayName}: ${header.selected}`}
            className="ml-2 bg-blue-900 font-bold text-white text-xs rounded-full w-5 h-5 flex-none flex items-center justify-center"
          >
            {format(header.selected)}
          </span>
        )}
      </button>
    ),
    [headerFilter]
  );

  const content = (
    <div className={hideOptionsBorder ? "p-3" : ""}>
      {isFilterable ? (
        <div className={filterClassName}>
          <input
            className={baseInputClassName}
            type="text"
            value={filter ?? ""}
            onChange={onSearchChange}
            placeholder="Filter"
          />
        </div>
      ) : (
        // Note: This is a hack to avoid scroll into view issue in FocusTrapZone
        <input
          className="absolute -top-20 w-0 h-0 outline-none focus:outline-none"
          type="text"
          tabIndex={-1}
          aria-label="Filter not available"
        />
      )}
      <div className={borderClassNames}>
        <div className={wrapperClassNames} style={{ minWidth: 400 }} {...rest}>
          <FocusZone
            handleTabKey={FocusZoneTabbableElements.all}
            isCircularNavigation={false}
          >
            <MultiselectOptions
              options={options}
              filter={filter}
              headerFilter={headerFilter}
              renderOptionDetails={renderOptionDetails}
              onSelectedChange={onSelectedChange}
            />
          </FocusZone>
        </div>
      </div>
    </div>
  );

  if (hasHeaderQuickLinks && headers.length > 1) {
    return (
      <div className="flex flex-row">
        <FocusZone
          handleTabKey={FocusZoneTabbableElements.none}
          isCircularNavigation={true}
        >
          <div className="flex flex-col h-full">
            {headers.map(renderHeaderButton)}
          </div>
        </FocusZone>
        <div>{content}</div>
      </div>
    );
  }

  return content;
};
