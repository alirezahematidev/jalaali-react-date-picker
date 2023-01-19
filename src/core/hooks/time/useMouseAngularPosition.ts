import { useCallback } from "react";
import { radianToDegree } from "../../../utils";
import * as c from "../../constants/variables";
import { Point, TimeMode } from "../../types";

interface Props {
  hoursStep: number;
  minutesStep: number;
}

export const useMouseAngularPosition = ({ hoursStep, minutesStep }: Props) => {
  const getValue = useCallback(
    (mouse: Point, mode: TimeMode) => {
      const hs = hoursStep < 1 ? 1 : hoursStep;
      const ms = minutesStep < 1 ? 1 : minutesStep;

      const x = mouse.x - c.ORIGIN_X;
      const y = mouse.y - c.ORIGIN_Y;

      const angleRadian = Math.atan2(y, x) + c.HALF_PI;

      let angle = radianToDegree(angleRadian);

      if (angle < 0) {
        angle += c.FULL_DEG;
      }

      const tick = mode === "hour" ? c.HOUR_TICK : c.MINUTE_TICK;

      const interval = mode === "hour" ? hs : ms * 6;

      const mark = Math.floor(angle / (tick * interval));

      const average = (mark + 0.5) * tick;

      const currentTick = mark * tick * interval;

      const procTick = (mark + 1) * tick * interval;

      const nextTick = procTick > c.FULL_DEG ? c.FULL_DEG : procTick;

      const rotate = angle > average ? nextTick : currentTick;

      const tickValue = mode === "hour" ? tick : tick * 6;

      const value = Math.round(rotate / tickValue);

      return value;
    },
    [hoursStep, minutesStep],
  );

  return getValue;
};
