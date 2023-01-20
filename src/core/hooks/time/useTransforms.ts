import moment from "moment-jalaali";
import { useMemo } from "react";
import {
  createMarkets,
  degreeToRadian,
  timePad,
  transformMomentToTime,
} from "../../../utils";
import * as c from "../../constants/variables";
import { TimePickerProps } from "../../interfaces";
import { Time, TimeMode } from "../../types";

type TransformMarker = {
  marker: number;
  label: string;
  transform: string;
  disableClassName: string;
};

interface UseTransformsProps extends TimePickerProps {
  mode: TimeMode;
}

export const useTransforms = ({
  mode,
  use12Hours,
  maxTime: _maxTime,
  minTime: _minTime,
}: UseTransformsProps) => {
  const minTime = useMemo<Time | undefined>(() => {
    if (!moment.isMoment(_minTime)) return _minTime;

    if (!_minTime.isValid()) return undefined;

    const time = transformMomentToTime(_minTime);

    return time;
  }, [_minTime]);

  const maxTime = useMemo<Time | undefined>(() => {
    if (!moment.isMoment(_maxTime)) return _maxTime;

    if (!_maxTime.isValid()) return undefined;

    const time = transformMomentToTime(_maxTime);

    return time;
  }, [_maxTime]);

  const { transforms } = useMemo(() => {
    const markers = createMarkets(mode);

    function transform(hour: number): number[] {
      const radius = c.ORIGIN_Y - c.MARK_SIZE / 2;

      const tick = mode === "hour" ? c.HOUR_TICK : 6 * c.MINUTE_TICK;

      const radian = degreeToRadian(hour * tick);

      const transX = radius * Math.sin(radian);

      const transY = c.ORIGIN_Y - radius * Math.cos(radian);

      const x = Math.round(transX);

      const y = Math.round(transY) - c.MARK_SIZE / 2;

      return [x, y];
    }

    function stepMarkers(mode: TimeMode, markers: number[]) {
      if (mode === "hour") return markers;

      const steps = markers.filter((marker) => marker % 5 === 0);

      return steps;
    }

    function transformMap(markers: number[]): TransformMarker[] {
      const map = stepMarkers(mode, markers).map((marker) => {
        const [x, y] = transform(marker);

        const t = `translate(${x}px,${y}px)`;

        let label = marker.toString();

        let disableClassName = "";

        if (mode === "hour") {
          const h = use12Hours ? marker + 12 : marker;

          label = h.toString();

          if (minTime && minTime.hour) {
            if (marker < minTime.hour) {
              disableClassName = "disable-tick";
            }
          }

          if (maxTime && maxTime.hour) {
            if (marker > maxTime.hour) {
              disableClassName = "disable-tick";
            }
          }
        }

        if (mode === "minute") {
          const m = marker === 60 ? 0 : marker;
          label = timePad(m);

          if (minTime && minTime.minute) {
            if (marker < minTime.minute) {
              disableClassName = "disable-tick";
            }
          }

          if (maxTime && maxTime.minute) {
            if (marker > maxTime.minute) {
              disableClassName = "disable-tick";
            }
          }
        }

        return {
          marker,
          label,
          disableClassName,
          transform: t,
        };
      });

      return map;
    }

    const transforms = transformMap(markers);

    return { transforms };
  }, [maxTime, minTime, mode, use12Hours]);

  return transforms;
};
