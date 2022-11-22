import { RefObject, useEffect, useState } from "react";

type Layout = {
  width: number;
  height: number;
};

export const useLayout = <T extends HTMLElement>(ref: RefObject<T>) => {
  const [layout, setLayout] = useState<Layout>({ height: 0, width: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const bounding = ref.current.getBoundingClientRect();

    if (bounding) {
      setLayout({ width: bounding.width, height: bounding.height });
    }
  }, [ref]);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const observer = new ResizeObserver(([entry]) => {
      setLayout({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [ref]);

  return layout;
};
