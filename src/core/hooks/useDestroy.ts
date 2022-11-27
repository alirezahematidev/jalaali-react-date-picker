import { MutableRefObject, useEffect } from "react";

type DestroyConfig = {
  element: MutableRefObject<HTMLDivElement | null>;
  callback: () => void;
  destroy: boolean;
  dir: "vertical" | "horizontal";
};

export const useDestroy = ({
  callback,
  destroy,
  element,
  dir,
}: DestroyConfig) => {
  useEffect(() => {
    if (!element.current || !destroy) return;

    const node = element.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const { isIntersecting, intersectionRect, boundingClientRect } = entry;
        const bw = boundingClientRect.width;
        const iw = intersectionRect.width;
        const bh = boundingClientRect.height;
        const ih = intersectionRect.height;

        if (!isIntersecting) {
          const h = (dir === "horizontal" ? bh : ih) === bh;

          const v = (dir === "vertical" ? bw : iw) === bw;

          if ((dir === "vertical" && v) || (dir === "horizontal" && h)) {
            callback();
          }
        }
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(node);

    return () => observer.unobserve(node);
  }, [element, callback, destroy, dir]);
};
