import {
  ISelectableOption,
  SelectableOptionMenuItemType,
} from "@fluentui/react";
import { ReactNode, useCallback, useEffect, useMemo, useRef } from "react";
import { useMemoryInfiniteScroll } from "../../hooks/useMemoryInfiniteScroll";
import { truncate } from "../../utils/formatting";
import { Checkbox } from "../Checkbox/Checkbox";

const MULTISELECT_SELECT_ALL_KEY = "MULTISELECT_SELECT_ALL_KEY";

interface Props {
  options: ISelectableOption[];
  onSelectedChange: (options: ISelectableOption[], isSelected: boolean) => void;
  renderOptionDetails?: (option: ISelectableOption) => ReactNode;
  filter?: string;
  headerFilter?: string;
}

export const MultiselectOptions = ({
  onSelectedChange,
  renderOptionDetails,
  options,
  filter,
  headerFilter,
}: Props) => {
  const filteredOptions: ISelectableOption[] = useMemo(() => {
    const emptyHeaders: ISelectableOption[] = [];
    const lower = filter?.toLowerCase();
    let currentHeader: ISelectableOption | undefined;
    let previous: ISelectableOption | undefined;
    const optionsFilter = (o: ISelectableOption) => {
      const matched =
        !lower || o.text?.toLowerCase().includes(lower) || o.itemType;

      if (!matched) {
        // Remove normal options not matching filter
        return false;
      }

      if (headerFilter) {
        if (o.itemType === SelectableOptionMenuItemType.Header) {
          currentHeader = o;
          return false; // Dont show headers when we have a headerFilter
        }

        if (currentHeader?.text !== headerFilter) {
          // Remove all options not matching headerFilter
          return false;
        }
      }

      if (
        filter &&
        o.itemType === SelectableOptionMenuItemType.SelectAll &&
        o.key !== MULTISELECT_SELECT_ALL_KEY
      ) {
        // Do not show custom select all when filtering
        return false;
      }

      if (!previous && o.itemType === SelectableOptionMenuItemType.Divider) {
        // First is divider
        return false;
      }

      if (
        previous &&
        previous.itemType === SelectableOptionMenuItemType.Divider &&
        o.itemType === SelectableOptionMenuItemType.Divider
      ) {
        // Two dividers
        return false;
      }

      if (
        previous &&
        previous.itemType === SelectableOptionMenuItemType.Header &&
        o.itemType === SelectableOptionMenuItemType.Header
      ) {
        // Two headers - aka first is empty
        emptyHeaders.push(previous);
      }

      previous = o;
      return true;
    };

    const list = options
      .filter(optionsFilter)
      .filter((o) => !emptyHeaders.includes(o));

    let last = list[list.length - 1];
    while (
      last &&
      (last.itemType === SelectableOptionMenuItemType.Divider ||
        last.itemType === SelectableOptionMenuItemType.Header)
    ) {
      // Remove last headers or dividers
      list.splice(list.length - 1, 1);
      last = list[list.length - 1];
    }

    if (list.some((o) => !o.itemType)) {
      // Selectable options have itemType 0
      return list;
    }

    return [];
  }, [options, filter, headerFilter]);

  const visibleOptions: ISelectableOption[] = useMemo(() => {
    const hasSelectAll = options.some(
      (o) => o.itemType === SelectableOptionMenuItemType.SelectAll
    );
    const addSelectAll = !hasSelectAll && options.length >= 3;

    if (!addSelectAll || filteredOptions.length === 0) {
      return filteredOptions;
    }

    const selectAll = !filteredOptions.some(
      (o) => !o.disabled && !o.itemType && !o.selected
    );
    return [
      {
        key: MULTISELECT_SELECT_ALL_KEY,
        text: "Select All",
        selected: selectAll,
        itemType: SelectableOptionMenuItemType.SelectAll,
      },
      {
        key: "multiselectDivider",
        text: "-",
        itemType: SelectableOptionMenuItemType.Divider,
      },
      ...filteredOptions,
    ];
  }, [options, filteredOptions]);

  const checkedChange = useCallback(
    (option: ISelectableOption, checked: boolean) => {
      if (
        option.itemType === SelectableOptionMenuItemType.SelectAll &&
        option.key === MULTISELECT_SELECT_ALL_KEY
      ) {
        // Only handle the embedded select all - and only change enabled options
        onSelectedChange(
          filteredOptions.filter((o) => !o.disabled && !o.itemType),
          checked
        );
      } else {
        onSelectedChange([option], checked);
      }
    },
    [filteredOptions, onSelectedChange]
  );

  const renderOption = (option: ISelectableOption) => {
    if (option.hidden) {
      return null;
    }

    switch (option.itemType) {
      case SelectableOptionMenuItemType.Divider:
        const dividerDetails = renderOptionDetails?.(option);
        return dividerDetails ? (
          <div
            key={option.key}
            className="flex justify-between items-center mr-2"
          >
            <div className="flex-grow border-t my-1 mr-2"></div>
            <span>{dividerDetails}</span>
          </div>
        ) : (
          <div key={option.key} className="flex-grow border-t my-1 mr-2"></div>
        );
      case SelectableOptionMenuItemType.Header:
        return (
          <div
            key={option.key}
            className="sticky top-0 font-bold flex justify-between items-center p-1 mt-1 mr-2 bg-menu-header text-blue-900"
            aria-label={option.ariaLabel}
            title={option.title}
          >
            <span>{option.text}</span>
            <span>{renderOptionDetails?.(option)}</span>
          </div>
        );
      case SelectableOptionMenuItemType.SelectAll:
      case SelectableOptionMenuItemType.Normal:
      default:
        const optionNode = (
          <div key={option.key} className="mr-2 grow">
            <Checkbox
              id={option.id}
              aria-label={option.ariaLabel}
              title={option.title}
              disabled={option.disabled}
              onCheckedChange={(checked: boolean) => {
                checkedChange(option, checked);
              }}
              checked={!!option.selected}
            >
              {truncate(option.text)}
            </Checkbox>
          </div>
        );

        if (renderOptionDetails) {
          return (
            <div
              key={option.key}
              className="flex justify-between items-center mr-2"
            >
              {optionNode}
              <span>{renderOptionDetails(option)}</span>
            </div>
          );
        }

        return optionNode;
    }
  };

  const countRef = useRef(20);
  const { items, sentryRef } = useMemoryInfiniteScroll(
    visibleOptions,
    countRef.current
  );
  useEffect(() => {
    // visibleOptions are updated when filter changes - so if a few pages are loaded and an item
    // is selected it would disappear unless pagesize is adjusted
    if (countRef.current < items.length) {
      countRef.current = items.length;
    }

    if (countRef.current > visibleOptions.length) {
      countRef.current = Math.max(20, items.length);
    }
  }, [items, visibleOptions]);

  return (
    <>
      {items.length === 0 ? (
        <div className="ml-1">
          {filter ? "No values matching filter" : "No values"}
        </div>
      ) : (
        items.map(renderOption)
      )}
      <div ref={sentryRef}></div>
    </>
  );
};
