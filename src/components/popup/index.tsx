import React, { ReactNode, useRef, useState } from "react";
import { useClickOutside } from "../../core/hooks/useClickoutside";
import { useDestroy } from "../../core/hooks/useDestroy";
import { useReverse } from "../../core/hooks/useReverse";
import { DatePicker } from "../date/picker";

export const Select = ({
  children,
  placement,
}: {
  children: ReactNode;
  placement?: "bottom" | "top" | "right" | "left";
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const [dir, setDir] = useState<"vertical" | "horizontal">("vertical");

  const [animate, setAnimate] = useState(false);

  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));

  const open = () => {
    setAnimate(true);
    setOpen((prev) => !prev);
  };

  const config = useReverse({
    element: ref,
    max: [352, 300],
    prevent: !!placement,
    dir,
  });

  useDestroy({
    element: panelRef,
    callback: () => {
      setOpen(false);
      setAnimate(false);
    },
    destroy: config().destroy && !placement,
    dir,
  });

  const onAnimationEnd = (e: React.AnimationEvent) => {
    if (e.animationName === "close") {
      e.preventDefault();
      setAnimate(false);
    }
  };

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      <div onClick={open}>{children}</div>
      {animate && (
        <div
          onAnimationEnd={onAnimationEnd}
          className={isOpen ? "popover-panel-open" : "popover-panel-close"}
          ref={panelRef}
          style={{
            width: 300,
            height: 352,
            overflow: "hidden",
            margin: 0,
            padding: 0,
            background: "#fff",
            position: "absolute",
            left:
              dir === "vertical" ? "unset" : config().reverse ? "unset" : -306,
            right: dir === "vertical" ? 0 : !config().reverse ? "unset" : -306,
            top: dir === "vertical" ? (config().reverse ? "unset" : 36) : 0,
            bottom:
              dir === "vertical" ? (!config().reverse ? "unset" : 36) : "unset",
          }}
        ></div>
      )}
    </div>
  );
};
