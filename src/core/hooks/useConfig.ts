import { MutableRefObject, useCallback } from "react";
import { Placement } from "../../components/popup";
import {
  DATE_HEIGHT,
  DATE_WIDTH,
  isClient,
  RANGE_HEIGHT,
  RANGE_WIDTH,
  RESP_RANGE_HEIGHT,
  TIME_HEIGHT,
  TIME_WIDTH,
} from "../constants/variables";
import { useWindowSize } from "./useWindowSize";

const placements: Placement[] = ["bottom", "left", "right", "top"];

type Mode = "date" | "range" | "time";

type ConfigProps = {
  element: MutableRefObject<HTMLDivElement | null>;
  placement?: Placement;
  shouldResponsive?: boolean;
  mode: Mode;
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
    const ph: Record<Mode, number> = {
      date: DATE_HEIGHT,
      time: TIME_HEIGHT,
      range: shouldResponsive ? RESP_RANGE_HEIGHT : RANGE_HEIGHT,
    };

    const pw: Record<Mode, number> = {
      date: DATE_WIDTH,
      time: TIME_WIDTH,
      range: shouldResponsive ? DATE_WIDTH : RANGE_WIDTH,
    };

    if (!element.current)
      return {
        animationClassName: undefined,
        coordinates: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          width: pw[mode],
          height: ph[mode],
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
          width: pw[mode],
          height: ph[mode],
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
          left: isJalaali ? l + w - pw[mode] : l,
          bottom: undefined,
          top: t + h + gap,
          right: undefined,
          width: pw[mode],
          height: ph[mode],
        };

        return { coordinates, animationClassName };
      }

      if (placement === "top") {
        const animationClassName = isJalaali
          ? "open-vert-top-left"
          : "open-vert-top-right";

        const coordinates: Coordinate = {
          left: isJalaali ? l + w - pw[mode] : l,
          top: t - (ph[mode] + gap),
          bottom: undefined,
          right: undefined,
          width: pw[mode],
          height: ph[mode],
        };

        return { coordinates, animationClassName };
      }
      if (placement === "left") {
        const animationClassName = "open-horz-left";

        const coordinates: Coordinate = {
          left: l - (pw[mode] + gap),
          top: t,
          bottom: undefined,
          right: undefined,
          width: pw[mode],
          height: ph[mode],
        };

        return { coordinates, animationClassName };
      }

      if (placement === "right") {
        const animationClassName = "open-horz-right";

        const coordinates: Coordinate = {
          right: r - (gap + pw[mode]),
          top: t,
          left: undefined,
          bottom: undefined,
          width: pw[mode],
          height: ph[mode],
        };

        return { coordinates, animationClassName };
      }
    }

    const canReverse = gap + h + ph[mode] < _window.height;

    const shouldReverse = canReverse ? b <= ph[mode] && t >= ph[mode] : false;

    const animationClassName = shouldReverse
      ? isJalaali
        ? "open-vert-top-left"
        : "open-vert-top-right"
      : isJalaali
      ? "open-vert-bottom-left"
      : "open-vert-bottom-right";

    const coordinates: Coordinate = {
      left: isJalaali ? l + w - pw[mode] : l,
      bottom: undefined,
      top: shouldReverse ? t - gap - ph[mode] : t + h + gap,
      right: undefined,
      width: pw[mode],
      height: ph[mode],
    };

    return {
      coordinates,
      animationClassName,
    };
  }, [mode, shouldResponsive, element, _window, placement, isJalaali]);

  return config;
};
