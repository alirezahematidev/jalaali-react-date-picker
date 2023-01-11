import { useRef, useState } from "react";
import { useMouseAngularPosition } from "../../core/hooks/time";

export const TimePicker = () => {
  const [grabbed, setGrabbed] = useState<boolean>(false);
  const getPosition = useMouseAngularPosition();
  const handleRef = useRef<HTMLDivElement>(null);

  const onMouseDown = () => {
    setGrabbed(true);
  };

  const onMouseUp = () => {
    setGrabbed(false);
  };

  console.log({ grabbed });

  return (
    <div className="time-panel">
      <div
        className="time-clock-area"
        onMouseDown={(e) => {
          const x = e.nativeEvent.offsetX;
          const y = e.nativeEvent.offsetY;

          const _x = e.clientX - e.currentTarget.offsetLeft;

          const _y = e.clientY - e.currentTarget.offsetTop;

          console.log({ x, y, _x, _y });

          // const angle = getPosition({ x, y });

          // console.log("down", { angle });
        }}
        // onMouseMove={(e) => {
        //   if (!grabbed) return;
        //   const x = e.nativeEvent.offsetX;
        //   const y = e.nativeEvent.offsetY;

        //   const angle = getPosition({ x, y });

        //   console.log("move", { angle });
        // }}
        onMouseUp={onMouseUp}
      >
        <div
          ref={handleRef}
          className="time-clock-handle"
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        />
      </div>
    </div>
  );
};
