import classNames from "classnames";
import { TimePickerProps } from "../../core";
import { useTimeConfig, useTransforms } from "../../core/hooks/time";
import { Icon } from "../icon";
import { DisableTime } from "./disableTime";
import { Transform } from "./transform";

export const TimePicker = (timeProps: TimePickerProps) => {
  const locale = timeProps.locale || "fa";

  const config = useTimeConfig(timeProps);

  const transforms = useTransforms({
    mode: config.mode,
    ...timeProps,
  });

  return (
    <div
      className={classNames(
        "time-panel",
        "panel-elevation",
        locale === "fa" ? "time-panel-rtl" : "time-panel-ltr",
        timeProps.className,
      )}
      style={timeProps.style}
      onMouseMove={config.clockEvents.onMouseMove}
    >
      <div className="time-panel-header" dir="rtl">
        <Icon.ChevronRight
          size={24}
          hoverEffect
          onClick={() => config.onTimeModeChange("minute")}
          disabled={config.mode === "minute"}
        />
        <div className="time-navigators-gap" />
        <Icon.ChevronLeft
          size={24}
          hoverEffect
          onClick={() => config.onTimeModeChange("hour")}
          disabled={config.mode === "hour"}
        />
      </div>
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
