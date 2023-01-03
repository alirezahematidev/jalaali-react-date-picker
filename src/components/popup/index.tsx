import classNames from "classnames";
import React, { memo, ReactNode, useMemo, useRef, useState } from "react";
import { useConfig } from "../../core/hooks";
import { useClickOutside } from "../../core/hooks/useClickoutside";
import { Portal } from "../portal";

export type Placement = "bottom" | "top" | "right" | "left";

const DATE_WIDTH = 300;
const DATE_HEIGHT = 352;
const RANGE_WIDTH = 600;
const RANGE_HEIGHT = 312;

interface PopupProps {
  children: ReactNode;
  placement?: Placement;
  isOpen?: boolean;
  panel: ReactNode;
  mode: "date" | "range";
  getContainer?: HTMLElement | (() => HTMLElement) | string;
  close: () => void;
  toggle: () => boolean | undefined;
}

export const Popup = memo(
  ({
    children,
    placement,
    close,
    toggle,
    isOpen,
    panel,
    mode,
    getContainer,
  }: PopupProps) => {
    const [animate, setAnimate] = useState(false);

    const refPopup = useClickOutside<HTMLDivElement>(close);

    const ref = useRef<HTMLDivElement>(null);

    const open = () => {
      const toggling = toggle();
      if (!toggling) return;

      setAnimate(true);
    };

    const config = useConfig({
      element: ref,
      placement,
      dimensions: [
        mode === "date" ? DATE_HEIGHT : RANGE_HEIGHT,
        mode === "date" ? DATE_WIDTH : RANGE_WIDTH,
      ],
    });

    const onAnimationEnd = (e: React.AnimationEvent) => {
      if (e.animationName === "close") {
        e.preventDefault();
        setAnimate(false);
      }
    };

    const className = useMemo(() => {
      if (isOpen) {
        return classNames(
          "popup-panel-overlay",
          "popover-panel-open",
          mode === "date" ? "popover-panel-date" : "popover-panel-range",
          config().animationClassName,
        );
      }
      return classNames(
        "popup-panel-overlay",
        "popover-panel-close",
        config().animationClassName,
      );
    }, [config, isOpen, mode]);

    return (
      <div ref={ref} className="popup-wrapper-overlay">
        <div onClick={open} className="input-wrapper">
          {children}
        </div>

        {animate && (
          <Portal getContainer={getContainer}>
            <div
              ref={refPopup}
              onAnimationEnd={onAnimationEnd}
              className={className}
              style={{
                width: mode === "date" ? DATE_WIDTH : RANGE_WIDTH,
                height: mode === "date" ? DATE_HEIGHT : RANGE_HEIGHT,
                ...config().coordinates,
              }}
            >
              {panel}
            </div>
          </Portal>
        )}
      </div>
    );
  },
);
