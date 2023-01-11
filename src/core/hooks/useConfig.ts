import { MutableRefObject, useCallback } from "react";
import { Placement } from "../../components/popup";
import {
  DATE_HEIGHT,
  DATE_WIDTH,
  isClient,
  RANGE_HEIGHT,
  RANGE_WIDTH,
  RESP_RANGE_HEIGHT,
} from "../constants/variables";
import { useWindowSize } from "./useWindowSize";

const placements: Placement[] = ["bottom", "left", "right", "top"];

type ConfigProps = {
  element: MutableRefObject<HTMLDivElement | null>;
  placement?: Placement;
  shouldResponsive?: boolean;
  mode: "date" | "range";
  isJalaali?: boolean;
};

type Coordinate = {
  top: number | undefined;
  left: number | undefined;
  right: number | undefined;
  bottom: number | undefined;
  width: number;
  height: number;
};

type Config = {
  coordinates: Coordinate;
  animationClassName: string | undefined;
};

export const useConfig = ({
  element,
  placement,
  mode,
  shouldResponsive,
  isJalaali,
}: ConfigProps) => {
  const _window = useWindowSize();

  const config: () => Config = useCallback(() => {
    const ph =
      mode === "date"
        ? DATE_HEIGHT
        : shouldResponsive
        ? RESP_RANGE_HEIGHT
        : RANGE_HEIGHT;
    const pw = mode === "date" || shouldResponsive ? DATE_WIDTH : RANGE_WIDTH;

    if (!element.current)
      return {
        animationClassName: undefined,
        coordinates: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          width: pw,
          height: ph,
        },
      };

    const node = element.current;

    const bounds = node.getBoundingClientRect();

    if (!bounds)
      return {
        animationClassName: undefined,
        coordinates: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          width: pw,
          height: ph,
        },
      };

    const scrollbarWidth = isClient
      ? Math.abs(window.innerWidth - document.body.clientWidth)
      : 0;

    //popup offset from input
    const gap = 8;

    // input height
    const h = bounds.height;

    //input width
    const w = bounds.width;

    // input offset from top of window
    const t = bounds.top;

    // input offset from left of window
    const l = bounds.left;

    // input offset from right of window
    const r = _window.width - l - w - scrollbarWidth;

    // input offset from bottom of window
    const b = _window.height - t - h;

    // popup width and height

    if (placement && placements.includes(placement)) {
      if (placement === "bottom") {
        const animationClassName = isJalaali
          ? "open-vert-bottom-left"
          : "open-vert-bottom-right";

        const coordinates: Coordinate = {
          left: isJalaali ? l + w - pw : l,
          bottom: undefined,
          top: t + h + gap,
          right: undefined,
          width: pw,
          height: ph,
        };

        return { coordinates, animationClassName };
      }

      if (placement === "top") {
        const animationClassName = isJalaali
          ? "open-vert-top-left"
          : "open-vert-top-right";

        const coordinates: Coordinate = {
          left: isJalaali ? l + w - pw : l,
          top: t - (ph + gap),
          bottom: undefined,
          right: undefined,
          width: pw,
          height: ph,
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
          width: pw,
          height: ph,
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
          width: pw,
          height: ph,
        };

        return { coordinates, animationClassName };
      }
    }

    const canReverse = gap + h + ph < _window.height;

    const shouldReverse = canReverse ? b <= ph && t >= ph : false;

    const animationClassName = shouldReverse
      ? isJalaali
        ? "open-vert-top-left"
        : "open-vert-top-right"
      : isJalaali
      ? "open-vert-bottom-left"
      : "open-vert-bottom-right";

    const coordinates: Coordinate = {
      left: isJalaali ? l + w - pw : l,
      bottom: undefined,
      top: shouldReverse ? t - gap - ph : t + h + gap,
      right: undefined,
      width: pw,
      height: ph,
    };

    return {
      coordinates,
      animationClassName,
    };
  }, [mode, shouldResponsive, element, _window, placement, isJalaali]);

  return config;
};
