import { useState } from "react";
import { useMouseAngularPosition } from "../../core/hooks/time";

export const TimePicker = () => {
  const [grabbed, setGrabbed] = useState<boolean>(false);
  const getPosition = useMouseAngularPosition();

  const onMouseDown = () => {
    setGrabbed(true);
  };

  const onMouseUp = () => {
    setGrabbed(false);
  };

  return (
    <div className="time-panel">
      <div
        className="time-clock-area"
        onMouseMove={(e) => {
          if (!grabbed) return;
          const x = e.nativeEvent.offsetX;
          const y = e.nativeEvent.offsetY;

          const angle = getPosition({ x, y });

          console.log({ angle });
        }}
      >
        <div
          className="time-clock-handle"
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        />
      </div>
    </div>
  );
};
