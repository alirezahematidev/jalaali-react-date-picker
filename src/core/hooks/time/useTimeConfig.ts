import moment, { Moment } from "moment-jalaali";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  existsTime,
  formattedTime,
  invokeSync,
  isEqual,
  isTouchInWindow,
  noLimitProvided,
  transformMomentToTime,
  transformTimeToMoment,
} from "../../../utils";
import * as c from "../../constants/variables";
import { TimePickerProps } from "../../interfaces";
import { Time, TimeMode } from "../../types";
import { useMouseAngularPosition } from "./useMouseAngularPosition";
import { useNow } from "./useNow";

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

type TimeConfigReturn = {
  clockEvents: TimeEvent;
  handleEvents: TimeEvent;
  transform: string;
  activeTickClassName: (marker: number) => string | undefined;
  onTimeModeChange: (timeMode: TimeMode) => void;
  handleGrabbed: boolean;
  handleClasses: string[];
  time: Time;
  minTime?: Time;
  maxTime?: Time;
  mode: TimeMode;
};

function setTimeValue(defaultValue?: Moment | null): Time {
  if (!defaultValue || !defaultValue.isValid()) {
    return { hour: 0, minute: 0 };
  }

  return transformMomentToTime(defaultValue);
}

export const useTimeConfig = (props: TimePickerProps): TimeConfigReturn => {
  const [handleGrabbed, setHandleGrabbed] = useState<boolean>(false);
  const [mode, setMode] = useState<TimeMode>("hour");
  const [shouldAnimated, setShouldAnimated] = useState<boolean>(false);
  // 0: hour, 1: minute
  const [TClasses, setTClasses] = useState<[string, string]>(["", ""]);

  const [time, setTime] = useState<Time>(setTimeValue(props.defaultValue));

  const setNowOnce = useRef<boolean>(true);

  const minutesStep = props.minutesStep ? props.minutesStep : 1;

  const hoursStep = props.hoursStep ? props.hoursStep : 1;

  useEffect(() => {
    if (props.defaultValue && !props.value) {
      setTime(setTimeValue(props.defaultValue));
    } else if (props.value) {
      setTime(setTimeValue(props.value));
    }
  }, [props.defaultValue, props.value]);

  const onSelectTime = useCallback(
    (mode: TimeMode, value?: number) => {
      setTime((prevTime) => ({ ...prevTime, [mode]: value }));

      const momentTime = transformTimeToMoment({ [mode]: value });

      const timeString = formattedTime({ [mode]: value }, props.format);

      if (mode === "hour") {
        props.onHourChange?.(value || 0);
      }

      if (mode === "minute") {
        props.onMinuteChange?.(value || 0);
      }

      props.onChange?.(momentTime, timeString);
    },
    [props],
  );

  /** Set time to now, if showNow is true */
  useNow({
    handleGrabbed,
    showNow: props.showNow,
    once: setNowOnce,
    setter(time) {
      setTime((t) => (isEqual(t, time) ? t : time));
    },
  });

  const minTime = useMemo<Time | undefined>(() => {
    const _minTime = props.minTime;

    if (!moment.isMoment(_minTime)) return _minTime;

    if (!_minTime.isValid()) return undefined;

    const time = transformMomentToTime(_minTime);

    return time;
  }, [props.minTime]);

  const maxTime = useMemo<Time | undefined>(() => {
    const _maxTime = props.maxTime;

    if (!moment.isMoment(_maxTime)) return _maxTime;

    if (!_maxTime.isValid()) return undefined;

    const time = transformMomentToTime(_maxTime);

    return time;
  }, [props.maxTime]);

  const getValue = useMouseAngularPosition({ hoursStep, minutesStep });

  const onTimeModeChange = useCallback((timeMode: TimeMode) => {
    setMode(timeMode);
  }, []);

  const shouldWaitTransition = useMemo(() => {
    if (!minTime && !maxTime) return false;

    if (minTime) {
      if (minTime.hour && time.hour && mode === "hour") {
        if (time.hour < minTime.hour) {
          return true;
        }
        return false;
      } else if (minTime.minute && time.minute && mode === "minute") {
        if (time.minute < minTime.minute) {
          return true;
        }
        return false;
      }
    }

    if (maxTime) {
      if (maxTime.hour && time.hour && mode === "hour") {
        if (time.hour > maxTime.hour) {
          return true;
        }
        return false;
      } else if (maxTime.minute && time.minute && mode === "minute") {
        if (time.minute > maxTime.minute) {
          return true;
        }
        return false;
      }
    }

    return false;
  }, [maxTime, minTime, mode, time]);

  const onClockMouseDown = useCallback(
    (event: Events) => {
      event.stopPropagation();

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
      event.stopPropagation();

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

      if (!shouldWaitTransition) {
        onTimeModeChange("minute");
      }

      if (noLimitProvided(minTime, maxTime)) {
        return onSelectTime(mode, time[mode]);
      }

      if (minTime) {
        if (
          mode === "hour" &&
          existsTime(minTime.hour) &&
          existsTime(time.hour)
        ) {
          if (time.hour < minTime.hour) {
            setTClasses(["animated-clock-handle-hour", ""]);
            setShouldAnimated(true);
            onSelectTime(mode, minTime.hour);
          } else {
            onSelectTime(mode, time.hour);
          }
        } else if (
          mode === "minute" &&
          existsTime(minTime.minute) &&
          existsTime(time.minute)
        ) {
          if (time.minute < minTime.minute) {
            setTClasses(["", "animated-clock-handle-minute"]);
            setShouldAnimated(true);
            onSelectTime(mode, minTime.minute);
          } else {
            onSelectTime(mode, time.minute);
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
            onSelectTime(mode, maxTime.hour);
          } else {
            onSelectTime(mode, time.hour);
          }
        } else if (
          mode === "minute" &&
          existsTime(maxTime.minute) &&
          existsTime(time.minute)
        ) {
          if (time.minute > maxTime.minute) {
            setTClasses(["", "animated-clock-handle-minute"]);
            setShouldAnimated(true);
            onSelectTime(mode, maxTime.minute);
          } else {
            onSelectTime(mode, time.minute);
          }
        }
      }
    },
    [
      maxTime,
      minTime,
      mode,
      onSelectTime,
      onTimeModeChange,
      shouldWaitTransition,
      time,
    ],
  );

  const onHandleMouseDown = (event: Events) => {
    event.stopPropagation();

    setHandleGrabbed(true);
  };

  const onHandleMouseUp = () => {
    setHandleGrabbed(false);
    if (!shouldWaitTransition) {
      onTimeModeChange("minute");
    }
  };

  const onHandleTransitionEnd = () => {
    invokeSync(() => onTimeModeChange("minute"), 400);
    setShouldAnimated(false);
    setTClasses(["", ""]);
  };

  useEffect(() => {
    if (c.isServer || !handleGrabbed) return;

    function handler(e: MouseEvent) {
      e.preventDefault();
      setHandleGrabbed(false);
      if (!shouldWaitTransition) {
        onTimeModeChange("minute");
      }
    }

    window.addEventListener("mouseup", handler);

    return () => window.removeEventListener("mouseup", handler);
  }, [handleGrabbed, onTimeModeChange, shouldWaitTransition]);

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
    minTime,
    maxTime,
  };
};
