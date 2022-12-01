import { MutableRefObject, useEffect } from "react";
import { Placement } from "../../components/popup";

type DestroyConfig = {
  element: MutableRefObject<HTMLDivElement | null>;
  callback: () => void;
  destroy: boolean;
  placement: Placement;
};

export const useDestroy = ({
  callback,
  destroy,
  element,
  placement,
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

        const isHorizontal = placement === "left" || placement === "right";
        const isVertical = placement === "top" || placement === "bottom";

        if (!isIntersecting) {
          const h = (isHorizontal ? bh : ih) === bh;

          const v = (isVertical ? bw : iw) === bw;

          if ((isVertical && v) || (isHorizontal && h)) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placement, element, callback, destroy]);
};
