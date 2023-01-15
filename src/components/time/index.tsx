import classNames from "classnames";
import { useRef } from "react";
import { TimePickerProps } from "../../core";
import {
  describeArc,
  useTimeConfig,
  useTransforms,
} from "../../core/hooks/time";
import { Transform } from "./transform";

export const TimePicker = ({ minTime, maxTime }: TimePickerProps) => {
  const handleRef = useRef<HTMLDivElement>(null);

  const config = useTimeConfig({ handleRef, minTime, maxTime });

  const transforms = useTransforms(config.mode);

  return (
    <div className="time-panel panel-elevation">
      <div
        className={classNames(
          "time-clock-area",
          config.handleGrabbed && "time-clock-handle-grab",
        )}
        {...config.clockEvents}
      >
        <div
          ref={handleRef}
          className={classNames(
            config.handleTickClassName,
            config.animatedHourClass,
            config.animatedMinuteClass,
            config.handleGrabbed && "time-clock-handle-grab",
          )}
          {...config.handleEvents}
          style={{
            transform: config.transform,
          }}
        />
        <svg width="220" height="220">
          {minTime && (
            <path
              d={describeArc(0, (minTime.minute || 0) * 6)}
              fill="#bbb"
            ></path>
          )}
          {maxTime && (
            <path
              d={describeArc((maxTime?.minute || 0) * 6, 360)}
              fill="#bbb"
            ></path>
          )}
        </svg>

        <Transform
          transforms={transforms}
          activeTickClassName={config.activeTickClassName}
        />
      </div>
    </div>
  );
};
