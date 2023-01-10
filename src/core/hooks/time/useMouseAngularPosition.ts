import { useCallback } from "react";
import { ORIGIN_X, ORIGIN_Y } from "../../constants/variables";
import { Point } from "./types/time.types";

export const useMouseAngularPosition = () => {
  const getPosition = useCallback((mouse: Point) => {
    const x = mouse.x - ORIGIN_X;
    const y = mouse.y - ORIGIN_Y;

    const angleRadian = Math.atan2(y, x);

    let angleDegree = angleRadian * (180 / Math.PI);

    if (angleDegree < 0) {
      angleDegree += 360;
    }

    return angleDegree;
  }, []);

  return getPosition;
};
