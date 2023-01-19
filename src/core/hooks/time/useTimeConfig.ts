import React, { useCallback, useEffect, useMemo, useState } from "react";
import { isTouchInWindow } from "../../../utils";
import * as c from "../../constants/variables";
import { Time, TimeMode } from "../../types";
import { useMouseAngularPosition } from "./useMouseAngularPosition";

type TEvent =
  | "onMouseDown"
  | "onMouseMove"
  | "onMouseUp"
  | "onTransitionEnd"
  | "onTouchStart"
  | "onTouchEnd"
  | "onTouchMove";

type Events = React.TransitionEvent<HTMLDivElement> &
  React.MouseEvent<HTMLDivElement> &
  React.TouchEvent<HTMLDivElement>;

type TimeEvent = {
  [event in TEvent]: (event: Events) => void;
};

type TimeConfigProps = {
  handleRef: React.RefObject<HTMLDivElement>;
  minTime?: Time;
  maxTime?: Time;
  hoursStep: number;
  minutesStep: number;
};

type TimeConfigReturn = {
  clockEvents: TimeEvent;
  handleEvents: TimeEvent;
  transform: string;
  activeTickClassName: (marker: number) => string | undefined;
  onTimeModeChange: (timeMode: TimeMode) => void;
  handleGrabbed: boolean;
  handleClasses: string[];
  time: Time;
  mode: TimeMode;
};

function existsTime(value?: number): value is number {
  return value !== undefined && typeof value === "number";
}

export const useTimeConfig = ({
  minTime,
  maxTime,
  hoursStep,
  minutesStep,
}: TimeConfigProps): TimeConfigReturn => {
  const [handleGrabbed, setHandleGrabbed] = useState<boolean>(false);
  const [mode, setMode] = useState<TimeMode>("hour");
  const [shouldAnimated, setShouldAnimated] = useState<boolean>(false);

  // 0: hour, 1: minute
  const [TClasses, setTClasses] = useState<[string, string]>(["", ""]);

  const [time, setTime] = useState<Time>({
    hour: 0,
    minute: 0,
  });

  const getValue = useMouseAngularPosition({ hoursStep, minutesStep });

  const onTimeModeChange = (timeMode: TimeMode) => {
    setMode(timeMode);
  };

  const onClockMouseDown = useCallback(
    (event: Events) => {
      if (!isTouchInWindow()) {
        if (event.button !== 0) return;
      }

      const offsetLeft = event.currentTarget.offsetLeft;

      const offsetTop = event.currentTarget.offsetTop;

      let clientX = event.clientX;
      let clientY = event.clientY;

      if (isTouchInWindow()) {
        clientX = event.targetTouches[0].clientX;

        clientY = event.targetTouches[0].clientY;
      }

      const x = clientX - offsetLeft;

      const y = clientY - offsetTop;

      const value = getValue({ x, y }, mode);

      setTime((prevTime) => ({ ...prevTime, [mode]: value }));
    },
    [getValue, mode],
  );

  const onClockMouseMove = useCallback(
    (event: Events) => {
      if (!handleGrabbed) return;

      if (!isTouchInWindow()) {
        if (event.button !== 0) return;
      }

      const offsetLeft = event.currentTarget.offsetLeft;

      const offsetTop = event.currentTarget.offsetTop;

      let clientX = event.clientX;
      let clientY = event.clientY;

      if (isTouchInWindow()) {
        clientX = event.targetTouches[0].clientX;

        clientY = event.targetTouches[0].clientY;
      }

      const x = clientX - offsetLeft;

      const y = clientY - offsetTop;

      const value = getValue({ x, y }, mode);

      setTime((prevTime) => ({ ...prevTime, [mode]: value }));
      setShouldAnimated(false);
      setTClasses(["", ""]);
    },
    [getValue, handleGrabbed, mode],
  );
  const onClockMouseUp = useCallback(
    (event: Events) => {
      if (!isTouchInWindow()) {
        if (event.button !== 0) return;
      }

      setHandleGrabbed(false);
      onTimeModeChange("minute");

      if (minTime) {
        if (
          mode === "hour" &&
          existsTime(minTime.hour) &&
          existsTime(time.hour)
        ) {
          if (time.hour < minTime.hour) {
            setTClasses(["animated-clock-handle-hour", ""]);
            setShouldAnimated(true);
            setTime((prevTime) => ({ ...prevTime, [mode]: minTime.hour }));
          }
        } else if (
          mode === "minute" &&
          existsTime(minTime.minute) &&
          existsTime(time.minute)
        ) {
          if (time.minute < minTime.minute) {
            setTClasses(["", "animated-clock-handle-minute"]);
            setShouldAnimated(true);
            setTime((prevTime) => ({ ...prevTime, [mode]: minTime.minute }));
          }
        }
      }

      if (maxTime) {
        if (
          mode === "hour" &&
          existsTime(maxTime.hour) &&
          existsTime(time.hour)
        ) {
          if (time.hour > maxTime.hour) {
            setTClasses(["animated-clock-handle-hour", ""]);
            setShouldAnimated(true);
            setTime((prevTime) => ({ ...prevTime, [mode]: maxTime.hour }));
          }
        } else if (
          mode === "minute" &&
          existsTime(maxTime.minute) &&
          existsTime(time.minute)
        ) {
          if (time.minute > maxTime.minute) {
            setTClasses(["", "animated-clock-handle-minute"]);
            setShouldAnimated(true);
            setTime((prevTime) => ({ ...prevTime, [mode]: maxTime.minute }));
          }
        }
      }
    },
    [maxTime, minTime, mode, time],
  );

  const onHandleMouseDown = () => {
    setHandleGrabbed(true);
  };

  const onHandleMouseUp = () => {
    setHandleGrabbed(false);
    onTimeModeChange("minute");
  };

  const onHandleTransitionEnd = () => {
    setShouldAnimated(false);
    setTClasses(["", ""]);
  };

  useEffect(() => {
    if (c.isServer || !handleGrabbed) return;

    function handler(e: MouseEvent) {
      e.preventDefault();
      setHandleGrabbed(false);
      onTimeModeChange("minute");
    }

    window.addEventListener("mouseup", handler);

    return () => window.removeEventListener("mouseup", handler);
  }, [handleGrabbed]);

  const handleTickClassName = useMemo(() => {
    if (mode === "hour") return "time-clock-handle";

    const minute = time.minute || 0;

    const minuteDegree = (minute / 60) * c.FULL_DEG;

    const active = minuteDegree % 5 === 0;

    if (active) return "time-clock-handle";

    return "time-clock-handle-tick";
  }, [time, mode]);

  const transform = useMemo(() => {
    const hour = time.hour || 0;
    const minute = time.minute || 0;

    const hourDegree = hour * c.HOUR_TICK;

    const minuteDegree = (minute / 60) * c.FULL_DEG;

    const hourRotate = `rotateZ(${hourDegree}deg)`;

    const minuteRotate = `rotateZ(${minuteDegree}deg)`;

    const t = mode === "hour" ? hourRotate : minuteRotate;

    return t;
  }, [mode, time]);

  const activeTickClassName = useCallback(
    (marker: number) => {
      const hour = time.hour || 0;
      const minute = time.minute || 0;

      if (shouldAnimated) return "";

      if (mode === "hour") {
        const active = [marker - 12, marker].includes(hour);

        let disabled = false;

        if (minTime && minTime.hour) {
          if (hour < minTime.hour) {
            disabled = true;
          }
        }

        if (maxTime && maxTime.hour) {
          if (hour > maxTime.hour) {
            disabled = true;
          }
        }

        if (active && !disabled) {
          return "tick-hour-selected";
        }
      } else if (mode === "minute") {
        const active = [marker - 60, marker].includes(minute);

        let disabled = false;

        if (minTime && minTime.minute) {
          if (minute < minTime.minute) {
            disabled = true;
          }
        }

        if (maxTime && maxTime.minute) {
          if (minute > maxTime.minute) {
            disabled = true;
          }
        }

        if (active && !disabled) return "tick-minute-selected";
      }
    },
    [maxTime, minTime, mode, time, shouldAnimated],
  );

  const clockEvents: TimeEvent = {
    onMouseDown: onClockMouseDown,
    onMouseMove: onClockMouseMove,
    onMouseUp: onClockMouseUp,
    onTouchStart: onClockMouseDown,
    onTouchEnd: onClockMouseUp,
    onTouchMove: onClockMouseMove,
    onTransitionEnd: () => null,
  };

  const handleEvents: TimeEvent = {
    onMouseDown: onHandleMouseDown,
    onMouseUp: onHandleMouseUp,
    onTransitionEnd: onHandleTransitionEnd,
    onTouchStart: onHandleMouseDown,
    onTouchEnd: onHandleMouseUp,
    onTouchMove: () => null,
    onMouseMove: () => null,
  };

  const animatedHourClass = mode === "hour" ? TClasses[0] : "";
  const animatedMinuteClass = mode === "minute" ? TClasses[1] : "";

  const handleClasses = [
    handleTickClassName,
    animatedHourClass,
    animatedMinuteClass,
  ];

  return {
    clockEvents,
    handleEvents,
    transform,
    activeTickClassName,
    onTimeModeChange,
    handleGrabbed,
    handleClasses,
    time,
    mode,
  };
};
