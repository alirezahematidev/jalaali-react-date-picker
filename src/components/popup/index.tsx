import classNames from "classnames";
import React, { ReactNode, useRef, useState } from "react";
import { useClickOutside } from "../../core/hooks/useClickoutside";
import { useDestroy } from "../../core/hooks/useDestroy";
import { useReverse } from "../../core/hooks/useReverse";

export type Placement = "bottom" | "top" | "right" | "left";

interface PopupProps {
  children: ReactNode;
  placement?: Placement;
  isOpen?: boolean;
  panel: ReactNode;
  mode: "date" | "range";
  close: () => void;
  toggle: () => boolean | undefined;
}

export const Popup = ({
  children,
  placement = "bottom",
  close,
  toggle,
  isOpen,
  panel,
  mode,
}: PopupProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  const [animate, setAnimate] = useState(false);

  const ref = useClickOutside<HTMLDivElement>(close);

  const open = () => {
    const toggling = toggle();
    if (!toggling) return;

    setAnimate(true);
  };

  const config = useReverse({
    element: ref,
    max: [mode === "date" ? 352 : 312, mode === "date" ? 300 : 600],
    placement,
  });

  useDestroy({
    element: panelRef,
    callback: () => {
      close();
      setAnimate(false);
    },
    destroy: config().destroy,
    placement,
  });

  const onAnimationEnd = (e: React.AnimationEvent) => {
    if (e.animationName === "close") {
      e.preventDefault();
      setAnimate(false);
    }
  };

  const a = () => {
    const vReverse = config().vReverse;

    const isVertical = placement === "bottom" || placement === "top";
    const isHorizontal = placement === "left" || placement === "right";

    const below =
      (placement === "bottom" && !vReverse) ||
      (placement === "top" && vReverse) ||
      isHorizontal;

    return { isVertical, below };
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
          className={
            isOpen
              ? classNames(
                  "popover-panel-open",
                  mode === "date"
                    ? "popover-panel-date"
                    : "popover-panel-range",
                  a().below ? "open-vert-bottom" : "open-vert-top",
                )
              : classNames(
                  "popover-panel-close",
                  a().below ? "open-vert-bottom" : "open-vert-top",
                )
          }
          ref={panelRef}
          style={{
            width: mode === "date" ? 300 : 600,
            height: mode === "date" ? 352 : 312,
            overflow: "hidden",
            margin: 0,
            padding: 0,
            background: "#fff",
            position: "absolute",
            boxShadow: "0px 0px 4px rgba(0,0,0,.2)",
            left: a().isVertical
              ? "unset"
              : config().hReverse
              ? "unset"
              : -(mode === "date" ? 306 : 606),
            right: a().isVertical
              ? 0
              : !config().hReverse
              ? "unset"
              : -(mode === "date" ? 306 : 606),
            top: a().isVertical ? (config().vReverse ? "unset" : 40) : 0,
            bottom: a().isVertical
              ? !config().vReverse
                ? "unset"
                : 40
              : "unset",
          }}
        >
          {panel}
        </div>
      )}
    </div>
  );
};
