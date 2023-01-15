import React, { useCallback, useMemo, useState } from "react";
import * as c from "../../constants/variables";
import { TimePickerProps } from "../../interfaces";
import { Time, TimeMode } from "../../types";
import { useMouseAngularPosition } from "./useMouseAngularPosition";

type TEvent = "onMouseDown" | "onMouseMove" | "onMouseUp" | "onTransitionEnd";

type TimeEvent = {
  [event in TEvent]: (
    event: React.TransitionEvent<HTMLDivElement> &
      React.MouseEvent<HTMLDivElement>,
  ) => void;
};

type TimeConfigProps = {
  handleRef: React.RefObject<HTMLDivElement>;
  minTime?: TimePickerProps["minTime"];
  maxTime?: TimePickerProps["maxTime"];
};

type TimeConfigReturn = {
  clockEvents: TimeEvent;
  handleEvents: TimeEvent;
  transform: string;
  handleTickClassName?: string;
  activeTickClassName: (marker: number) => string | undefined;
  onTimeModeChange: (timeMode: TimeMode) => void;
  handleGrabbed: boolean;
  time: Time;
  mode: TimeMode;
  animatedHourClass: string;
  animatedMinuteClass: string;
};

export const useTimeConfig = ({
  minTime,
  maxTime,
}: TimeConfigProps): TimeConfigReturn => {
  const [handleGrabbed, setHandleGrabbed] = useState<boolean>(false);
  const [mode, setMode] = useState<TimeMode>("hour");
  const [animatedHourClass, setAnimatedHourClass] = useState("");
  const [animatedMinuteClass, setAnimatedMinuteClass] = useState("");

  const [time, setTime] = useState<Time>({
    hour: 0,
    minute: 0,
  });

  const getValue = useMouseAngularPosition();

  const onTimeModeChange = (timeMode: TimeMode) => {
    setMode(timeMode);
  };

  const onClockMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const x = event.clientX - event.currentTarget.offsetLeft;

      const y = event.clientY - event.currentTarget.offsetTop;

      const value = getValue({ x, y }, mode);

      setTime((prevTime) => ({ ...prevTime, [mode]: value }));
    },
    [getValue, mode],
  );

  const onClockMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!handleGrabbed) return;

      const x = event.clientX - event.currentTarget.offsetLeft;
      const y = event.clientY - event.currentTarget.offsetTop;

      const value = getValue({ x, y }, mode);

      setTime((prevTime) => ({ ...prevTime, [mode]: value }));

      setAnimatedMinuteClass("");
      setAnimatedHourClass("");
    },
    [getValue, handleGrabbed, mode],
  );

  const onClockMouseUp = () => {
    setHandleGrabbed(false);
    onTimeModeChange("minute");

    if (minTime) {
      if (mode === "hour") {
        if (time.hour < minTime.hour) {
          setAnimatedHourClass("animated-clock-handle-hour");
          setAnimatedMinuteClass("");

          setTime((prevTime) => ({ ...prevTime, [mode]: minTime.hour }));
        }
      } else if (mode === "minute") {
        if (time.minute < minTime.minute) {
          setAnimatedHourClass("");
          setAnimatedMinuteClass("animated-clock-handle-minute");

          setTime((prevTime) => ({ ...prevTime, [mode]: minTime.minute }));
        }
      }
    }

    if (maxTime) {
      if (mode === "hour") {
        if (time.hour > maxTime.hour) {
          setAnimatedHourClass("animated-clock-handle-hour");
          setAnimatedMinuteClass("");
          setTime((prevTime) => ({ ...prevTime, [mode]: maxTime.hour }));
        }
      } else if (mode === "minute") {
        if (time.minute > maxTime.minute) {
          setAnimatedHourClass("");
          setAnimatedMinuteClass("animated-clock-handle-minute");
          setTime((prevTime) => ({ ...prevTime, [mode]: maxTime.minute }));
        }
      }
    }
  };

  const onHandleMouseDown = () => {
    setHandleGrabbed(true);
  };

  const onHandleMouseUp = () => {
    setHandleGrabbed(false);
    onTimeModeChange("minute");
  };

  const onHandleTransitionEnd = () => {
    setAnimatedHourClass("");
    setAnimatedMinuteClass("");
  };

  const handleTickClassName = useMemo(() => {
    if (mode === "hour") return "time-clock-handle";

    const minuteDegree = (time.minute / 60) * c.FULL_DEG;

    const active = minuteDegree % 5 === 0;

    if (active) return "time-clock-handle";

    return "time-clock-handle-tick";
  }, [time, mode]);

  const transform = useMemo(() => {
    const hourDegree = time.hour * c.HOUR_TICK;

    const minuteDegree = (time.minute / 60) * c.FULL_DEG;

    const hourRotate = `rotateZ(${hourDegree}deg)`;

    const minuteRotate = `rotateZ(${minuteDegree}deg)`;

    const t = mode === "hour" ? hourRotate : minuteRotate;

    return t;
  }, [mode, time]);

  const activeTickClassName = useCallback(
    (marker: number) => {
      if (mode === "hour") {
        const active = [marker - 12, marker].includes(time.hour);

        if (active) return "tick-hour-selected";
      } else if (mode === "minute") {
        const active = [marker - 60, marker].includes(time.minute);

        if (active) return "tick-minute-selected";
      }
    },
    [mode, time],
  );

  const clockEvents: TimeEvent = {
    onMouseDown: onClockMouseDown,
    onMouseMove: onClockMouseMove,
    onMouseUp: onClockMouseUp,
    onTransitionEnd: () => null,
  };

  const handleEvents: TimeEvent = {
    onMouseDown: onHandleMouseDown,
    onMouseUp: onHandleMouseUp,
    onTransitionEnd: onHandleTransitionEnd,
    onMouseMove: () => null,
  };

  return {
    clockEvents,
    handleEvents,
    transform,
    activeTickClassName,
    handleTickClassName,
    onTimeModeChange,
    handleGrabbed,
    animatedHourClass: mode === "hour" ? animatedHourClass : "",
    animatedMinuteClass: mode === "minute" ? animatedMinuteClass : "",
    time,
    mode,
  };
};
