import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { HOUR_TICK } from "../../core/constants/variables";
import { useMouseAngularPosition, useTransforms } from "../../core/hooks/time";

type Mode = "hour" | "minute";

type Time = {
  [k in Mode]: number;
};

export const TimePicker = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"hour" | "minute">("hour");
  const [time, setTime] = useState<Time>({
    hour: 0,
    minute: 0,
  });
  const [grabbed, setGrabbed] = useState<boolean>(false);

  const getRotate = useMouseAngularPosition();

  const transforms = useTransforms(mode);

  const onMouseDown = () => {
    setGrabbed(true);
  };

  const onMouseUp = () => {
    setGrabbed(false);
    setMode("minute");
  };

  useEffect(() => {
    setTime((prevTime) => prevTime);
    if (ref.current) {
      const node = ref.current;

      node.classList.toggle("handle-animate-move");
    }
  }, [mode]);

  console.log({ time: `${time.hour}:${time.minute}` });

  return (
    <div className="time-panel panel-elevation">
      <div
        className={classNames(
          "time-clock-area",
          grabbed && "time-clock-handle-move",
        )}
        onMouseDown={(e) => {
          const x = e.clientX - e.currentTarget.offsetLeft;
          const y = e.clientY - e.currentTarget.offsetTop;
          const value = getRotate({ x, y }, mode);

          setTime((prevTime) => ({ ...prevTime, [mode]: value }));
        }}
        onMouseMove={(e) => {
          if (!grabbed) return;

          const x = e.clientX - e.currentTarget.offsetLeft;
          const y = e.clientY - e.currentTarget.offsetTop;

          const value = getRotate({ x, y }, mode);

          setTime((prevTime) => ({ ...prevTime, [mode]: value }));
        }}
        onMouseUp={onMouseUp}
      >
        <div
          className={classNames(
            "time-clock-handle",
            grabbed && "time-clock-handle-move",
          )}
          ref={ref}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          style={{
            transform:
              mode === "hour"
                ? `rotateZ(${time.hour * HOUR_TICK}deg)`
                : `rotateZ(${(time.minute / 60) * 360}deg)`,
          }}
        />
        {transforms.map(({ transform, marker }) => (
          <div
            key={marker}
            className="hour"
            style={{
              transform,
              color: (
                mode === "hour"
                  ? [marker - 12, marker].includes(time.hour)
                  : [marker - 60, marker].includes(time.minute)
              )
                ? "#fff"
                : "#000",
            }}
          >
            {marker.toString().padStart(2, "0")}
          </div>
        ))}
      </div>
    </div>
  );
};
