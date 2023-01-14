import classNames from "classnames";
import { useRef } from "react";
import { TimePickerProps } from "../../core";
import { useTimeConfig, useTransforms } from "../../core/hooks/time";
import { Transform } from "./transform";

export const TimePicker = (timePickerProps: TimePickerProps) => {
  const handleRef = useRef<HTMLDivElement>(null);

  const config = useTimeConfig({ handleRef });

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
            config.handleGrabbed && "time-clock-handle-grab",
          )}
          {...config.handleEvents}
          style={{
            transform: config.transform,
          }}
        />
        <Transform
          transforms={transforms}
          activeTickClassName={config.activeTickClassName}
        />
      </div>
    </div>
  );
};
