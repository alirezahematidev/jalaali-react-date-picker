import classNames from "classnames";
import { TimePickerProps } from "../../core";
import { useTimeConfig, useTransforms } from "../../core/hooks/time";
import { DisableTime } from "./disableTime";
import { Transform } from "./transform";

export const TimePicker = (timeProps: TimePickerProps) => {
  const config = useTimeConfig(timeProps);

  const transforms = useTransforms({
    mode: config.mode,
    ...timeProps,
  });

  return (
    <div
      className="time-panel panel-elevation"
      onMouseMove={config.clockEvents.onMouseMove}
    >
      <div
        onContextMenu={(e) => e.preventDefault()}
        className={classNames(
          "time-clock-area",
          config.handleGrabbed && "time-clock-handle-grab",
        )}
        {...config.clockEvents}
      >
        <div
          className={classNames(
            ...config.handleClasses,
            config.handleGrabbed && "time-clock-handle-grab",
          )}
          {...config.handleEvents}
          style={{
            transform: config.transform,
          }}
        />
        <DisableTime
          mode={config.mode}
          maxTime={config.maxTime}
          minTime={config.minTime}
        />
        <Transform
          transforms={transforms}
          activeTickClassName={config.activeTickClassName}
        />
      </div>
    </div>
  );
};
