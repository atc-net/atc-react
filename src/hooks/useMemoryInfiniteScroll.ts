import { useCallback, useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

export const useMemoryInfiniteScroll = <T>(
  allItems: T[] | undefined,
  pageSize: number = 20
) => {
  const [items, setItems] = useState(allItems?.slice(0, pageSize) ?? []);
  const loadMore = useCallback(() => {
    const length = items.length + pageSize;
    setItems(allItems?.slice(0, length) ?? []);
  }, [setItems, items, allItems, pageSize]);

  const [sentryRef] = useInfiniteScroll({
    loading: false,
    hasNextPage: !!allItems && items.length < allItems.length,
    onLoadMore: loadMore,
    disabled: false,
    rootMargin: "0px 0px 400px 0px",
  });

  useEffect(() => {
    setItems(allItems?.slice(0, pageSize) ?? []);
  }, [allItems, setItems, pageSize]);

  return {
    items,
    sentryRef,
  };
};
