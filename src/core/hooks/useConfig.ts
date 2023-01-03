import { MutableRefObject, useCallback } from "react";
import { Placement } from "../../components/popup";
import { isClient } from "../constants/variables";
import { useWindowSize } from "./useWindowSize";

const placements: Placement[] = ["bottom", "left", "right", "top"];

type ConfigProps = {
  element: MutableRefObject<HTMLDivElement | null>;
  dimensions: [number, number];
  placement?: Placement;
};

type Coordinate = {
  top: number | undefined;
  left: number | undefined;
  right: number | undefined;
  bottom: number | undefined;
};

type Config = {
  coordinates: Coordinate;
  animationClassName: string | undefined;
};

const DEFAULT_CONFIG: Config = {
  animationClassName: undefined,
  coordinates: { bottom: 0, left: 0, right: 0, top: 0 },
};

export const useConfig = ({ element, dimensions, placement }: ConfigProps) => {
  const { height, width } = useWindowSize();

  const config: () => Config = useCallback(() => {
    if (!element.current) return DEFAULT_CONFIG;

    const node = element.current;

    const bounds = node.getBoundingClientRect();

    if (!bounds) return DEFAULT_CONFIG;

    const scrollbarWidth = isClient
      ? Math.abs(window.innerWidth - document.body.clientWidth)
      : 0;

    const scrollbarHeight = isClient
      ? Math.abs(window.innerHeight - document.body.clientHeight)
      : 0;

    //popup offset from input
    const gap = 8;

    // input height
    const h = bounds.height;

    //input width
    const w = bounds.width;

    // input offset from top of window
    const t = bounds.top + scrollbarHeight;

    // input offset from left of window
    const l = bounds.left;

    // input offset from right of window
    const r = width - l - w - scrollbarWidth;

    // input offset from bottom of window
    const b = height - t - h;

    // popup width and height
    const [ph, pw] = dimensions;

    if (placement && placements.includes(placement)) {
      if (placement === "bottom") {
        const animationClassName = "open-vert-bottom-left";

        const coordinates: Coordinate = {
          left: l + w - pw,
          bottom: b - (ph + gap),
          top: undefined,
          right: undefined,
        };

        return { coordinates, animationClassName };
      }

      if (placement === "top") {
        const animationClassName = "open-vert-top-left";

        const coordinates: Coordinate = {
          left: l + w - pw,
          top: t - (ph + gap),
          bottom: undefined,
          right: undefined,
        };

        return { coordinates, animationClassName };
      }
      if (placement === "left") {
        const animationClassName = "open-horz-left";

        const coordinates: Coordinate = {
          left: l - (pw + gap),
          top: t,
          bottom: undefined,
          right: undefined,
        };

        return { coordinates, animationClassName };
      }

      if (placement === "right") {
        const animationClassName = "open-horz-right";

        const coordinates: Coordinate = {
          right: r - (gap + pw),
          top: t,
          left: undefined,
          bottom: undefined,
        };

        return { coordinates, animationClassName };
      }
    }

    const canReverse = gap + h + ph < height;

    const shouldReverse = canReverse ? b <= ph && t >= ph : false;

    const animationClassName = shouldReverse
      ? "open-vert-top-left"
      : "open-vert-bottom-left";

    const coordinates: Coordinate = {
      left: l + w - pw,
      bottom: shouldReverse ? gap + (height - t) : b - (ph + gap),
      top: undefined,
      right: undefined,
    };

    return {
      coordinates,
      animationClassName,
    };
  }, [element, width, height, dimensions, placement]);

  return config;
};
