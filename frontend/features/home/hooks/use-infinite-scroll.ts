import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  enabled?: boolean;
  threshold?: number;
  rootMargin?: string;
}

export function useInfiniteScroll(
  onIntersect: () => void,
  options: UseInfiniteScrollOptions = {},
) {
  const { enabled = true, threshold = 0.1, rootMargin = "100px" } = options;

  const ref = useRef<HTMLDivElement | null>(null);

  const callbackRef = useRef(onIntersect);

  useEffect(() => {
    callbackRef.current = onIntersect;
  }, [onIntersect]);
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callbackRef.current();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, threshold, rootMargin]);

  return ref;
}
