import { useCallback } from "react";
import { radianToDegree } from "../../../utils";
import * as c from "../../constants/variables";
import { Point, TimeMode } from "../../types";

export const useMouseAngularPosition = () => {
  const getValue = useCallback((mouse: Point, mode: TimeMode) => {
    const x = mouse.x - c.ORIGIN_X;
    const y = mouse.y - c.ORIGIN_Y;

    const angleRadian = Math.atan2(y, x) + c.HALF_PI;

    let angle = radianToDegree(angleRadian);

    if (angle < 0) {
      angle += c.FULL_DEG;
    }

    const tick = mode === "hour" ? c.HOUR_TICK : c.MINUTE_TICK;

    const mark = Math.floor(angle / tick);

    const average = (mark + 0.5) * tick;

    const rotate = angle > average ? (mark + 1) * tick : mark * tick;

    const value = Math.round(rotate / (mode === "hour" ? tick : tick * 6));

    return value;
  }, []);

  return getValue;
};
