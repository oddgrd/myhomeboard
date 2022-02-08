import { useRef, useCallback } from "react";

export const useInfiniteScroll = (callback: () => void, isFetching: boolean) => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.9
  };
  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node) => {
      if (isFetching) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      }, options);

      if (node) observer.current.observe(node);
    },
    [callback, isFetching]
  );

  return [lastElementRef];
};