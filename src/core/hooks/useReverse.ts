import { MutableRefObject, useCallback, useRef } from "react";
import { Placement } from "../../components/popup";
import { useWindowSize } from "./useWindowSize";

type ReverseConfig = {
  element: MutableRefObject<HTMLDivElement | null>;
  max: [number, number];
  placement: Placement;
};

type Config = {
  vReverse: boolean;
  hReverse: boolean;
  destroy: boolean;
};

const DEFAULT_CONFIG: Config = {
  vReverse: false,
  hReverse: false,
  destroy: true,
};

export const useReverse = ({ element, max, placement }: ReverseConfig) => {
  const { height, width } = useWindowSize();

  const config = useCallback(() => {
    if (!element.current) return DEFAULT_CONFIG;

    const node = element.current;

    const bounds = node.getBoundingClientRect();

    if (bounds) {
      const h = bounds.height;
      const w = bounds.width;
      const t = bounds.top;
      const l = bounds.left;

      if (placement === "bottom" || placement === "top") {
        const vReverse = height - (h + t) < max[0];

        if (t < max[0] && vReverse) {
          return { destroy: false, vReverse: false };
        }
        return { destroy: true, vReverse };
      }
      const hReverse = l < max[1];

      if (hReverse && width - (l + w) < max[1]) {
        return { destroy: false, hReverse: false };
      }
      return { destroy: true, hReverse };
    }

    return DEFAULT_CONFIG;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, height, max, width]);

  return config;
};
