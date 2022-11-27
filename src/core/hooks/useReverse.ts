import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { useWindowSize } from "./useWindowSize";

type ReverseConfig = {
  element: MutableRefObject<HTMLDivElement | null>;
  max: [number, number];
  prevent: boolean;
  dir: "vertical" | "horizontal";
};

type Config = {
  reverse: boolean;
  destroy: boolean;
};

const DEFAULT_CONFIG: Config = { reverse: false, destroy: true };

export const useReverse = ({ element, max, prevent, dir }: ReverseConfig) => {
  const { height, width } = useWindowSize();

  const config = useCallback(() => {
    if (!element.current || prevent) return DEFAULT_CONFIG;

    const node = element.current;

    const bounds = node.getBoundingClientRect();

    if (bounds) {
      const h = bounds.height;
      const w = bounds.width;
      const t = bounds.top;
      const l = bounds.left;

      if (dir === "vertical") {
        const reverse = height - (h + t) < max[0];

        if (t < max[0] && reverse) {
          return { destroy: false, reverse: false };
        }
        return { destroy: true, reverse };
      }
      const reverse = l < max[1];

      if (reverse && width - (l + w) < max[1]) {
        return { destroy: false, reverse: false };
      }
      return { destroy: true, reverse };
    }

    return DEFAULT_CONFIG;
  }, [dir, element, height, max, prevent, width]);

  return config;
};
