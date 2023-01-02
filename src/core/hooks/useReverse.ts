import { MutableRefObject, useCallback } from "react";
import { Placement } from "../../components/popup";
import { useWindowSize } from "./useWindowSize";

type ReverseConfig = {
  element: MutableRefObject<HTMLDivElement | null>;
  max: [number, number];
  placement: Placement;
};

type Config = {
  shouldVerticalReverse: boolean;
  shouldHorizontalReverse: boolean;
  top: number | undefined;
  left: number | undefined;
  right: number | undefined;
  bottom: number | undefined;
  animationClassName: string | undefined;
};

const DEFAULT_CONFIG: Config = {
  shouldVerticalReverse: false,
  shouldHorizontalReverse: false,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  animationClassName: undefined,
};

export const useReverse = ({ element, max, placement }: ReverseConfig) => {
  const { height, width } = useWindowSize();

  const config: () => Config = useCallback(() => {
    if (!element.current) return DEFAULT_CONFIG;

    const node = element.current;

    const bounds = node.getBoundingClientRect();

    if (bounds) {
      const gap = 8;
      const h = bounds.height;
      const w = bounds.width;
      const t = bounds.top;
      const l = bounds.left;
      const popupHeight = max[0];
      const popupWidth = max[1];
      const shouldVerticalReverse =
        gap + h + popupHeight > height
          ? false
          : placement === "bottom"
          ? height - (h + t) <= popupHeight
          : placement === "top"
          ? t <= popupHeight
          : false;

      const shouldHorizontalReverse =
        (placement === "left" && l + popupWidth >= width) ||
        (placement === "right" && l + w <= popupWidth)
          ? false
          : placement === "left"
          ? l <= popupWidth
          : placement === "right"
          ? width - (l + w) <= popupWidth
          : false;

      const { animationClassName } = generateAnimation({
        placement,
        shouldHorizontalReverse,
        shouldVerticalReverse,
        l,
        width,
      });

      if (placement === "bottom" || placement === "top") {
        const left = l <= popupWidth || shouldHorizontalReverse ? 0 : undefined;
        const right =
          l <= popupWidth || shouldHorizontalReverse ? undefined : 0;
        return {
          shouldVerticalReverse,
          shouldHorizontalReverse,
          bottom:
            placement === "bottom"
              ? shouldVerticalReverse
                ? h + gap
                : -(popupHeight + gap)
              : undefined,
          top:
            placement === "top"
              ? shouldVerticalReverse
                ? h + gap
                : -(popupHeight + gap)
              : undefined,
          left,
          right,
          animationClassName,
        };
      }

      return {
        shouldHorizontalReverse,
        shouldVerticalReverse,
        top: 0,
        left:
          placement === "left"
            ? shouldHorizontalReverse
              ? l + w
              : -(popupWidth + gap)
            : undefined,
        right:
          placement === "right"
            ? shouldHorizontalReverse
              ? w + gap
              : -(popupWidth + gap)
            : undefined,

        bottom: undefined,
        animationClassName,
      };
    }

    return DEFAULT_CONFIG;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, height, max, width]);

  return config;
};

const generateAnimation = ({
  placement,
  shouldHorizontalReverse,
  shouldVerticalReverse,
  l,
  width,
}: {
  placement: Placement;
  shouldVerticalReverse: boolean;
  shouldHorizontalReverse: boolean;
  l: number;
  width: number;
}) => {
  const below =
    (placement === "bottom" && !shouldVerticalReverse) ||
    (placement === "top" && shouldVerticalReverse) ||
    placement === "left" ||
    placement === "right";
  const isRight =
    (placement === "right" && !shouldHorizontalReverse) ||
    (placement === "left" && shouldHorizontalReverse) ||
    ((placement === "top" || placement === "bottom") && l > width / 2);

  const animationClassName =
    placement === "top" || placement === "bottom"
      ? below
        ? isRight
          ? "open-vert-bottom-left"
          : "open-vert-bottom-right"
        : isRight
        ? "open-vert-top-left"
        : "open-vert-top-right"
      : placement === "right" || placement === "left"
      ? isRight
        ? "open-horz-right"
        : "open-horz-left"
      : undefined;

  return {
    animationClassName,
  };
};
