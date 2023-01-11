import { useMemo } from "react";
import {
  HOUR_TICK,
  MARK_SIZE,
  MINUTE_TICK,
  ORIGIN_Y,
} from "../../constants/variables";

export const useTransforms = (mode: "hour" | "minute") => {
  function toRadian(degree: number) {
    return degree * (Math.PI / 180);
  }

  const transforms = useMemo(() => {
    const markers = Array.from(
      { length: mode === "hour" ? 12 : 60 },
      (_, i) => i + 1,
    );

    function transform(hour: number) {
      const radius = ORIGIN_Y - MARK_SIZE / 2;

      const tick = mode === "hour" ? HOUR_TICK : 6 * MINUTE_TICK;

      const radian = toRadian(hour * tick);

      const transX = radius * Math.sin(radian);

      const transY = ORIGIN_Y - radius * Math.cos(radian);

      const x = Math.round(transX);

      const y = Math.round(transY) - MARK_SIZE / 2;

      return { x, y };
    }

    return markers
      .filter((m) => (mode === "hour" ? true : m % 5 === 0))
      .map((marker) => ({
        marker,
        transform: `translate(${transform(marker).x}px,${
          transform(marker).y
        }px)`,
      }));
  }, [mode]);

  return transforms;
};
