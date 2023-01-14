import { useCallback, useMemo, useState } from "react";
import * as c from "../../constants/variables";
import { Time, TimeMode } from "../../types";
import { useMouseAngularPosition } from "./useMouseAngularPosition";

type TEvent = "onMouseDown" | "onMouseMove" | "onMouseUp";

type TimeEvent = {
  [event in TEvent]: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
};

type TimeConfigProps = {
  handleRef: React.RefObject<HTMLDivElement>;
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
};

export const useTimeConfig = ({}: TimeConfigProps): TimeConfigReturn => {
  const [handleGrabbed, setHandleGrabbed] = useState<boolean>(false);
  const [mode, setMode] = useState<TimeMode>("hour");
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
    },
    [getValue, handleGrabbed, mode],
  );

  const onClockMouseUp = () => {
    setHandleGrabbed(false);
    onTimeModeChange("minute");
  };

  const onHandleMouseDown = () => {
    setHandleGrabbed(true);
  };

  const onHandleMouseUp = () => {
    setHandleGrabbed(false);
    onTimeModeChange("minute");
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
  };

  const handleEvents: TimeEvent = {
    onMouseDown: onHandleMouseDown,
    onMouseUp: onHandleMouseUp,
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
    time,
    mode,
  };
};
