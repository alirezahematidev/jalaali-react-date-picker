import { useCallback } from "react";
import {
  HOUR_TICK,
  MINUTE_TICK,
  ORIGIN_X,
  ORIGIN_Y,
} from "../../constants/variables";
import { Point } from "./types/time.types";

type Mode = "hour" | "minute";

export const useMouseAngularPosition = () => {
  const getPosition = useCallback((mouse: Point, mode: Mode) => {
    const x = mouse.x - ORIGIN_X;
    const y = mouse.y - ORIGIN_Y;

    const angleRadian = Math.atan2(y, x) + Math.PI / 2;

    let angle = angleRadian * (180 / Math.PI);

    if (angle < 0) {
      angle += 360;
    }

    const tick = mode === "hour" ? HOUR_TICK : MINUTE_TICK;

    const mark = Math.floor(angle / tick);

    const average = (mark + 0.5) * tick;

    const rotate = angle > average ? (mark + 1) * tick : mark * tick;

    return Math.round(rotate / (mode === "hour" ? tick : tick * 6));
  }, []);

  return getPosition;
};
