import classNames from "classnames";
import React, { Fragment, memo, ReactNode, useMemo, useRef } from "react";
import { useConfig, useShouldResponsive } from "../../core/hooks";
import { useClickOutside } from "../../core/hooks/useClickoutside";
import { Portal } from "../portal";

export type Placement = "bottom" | "top" | "right" | "left";

export type Responsive = "desktop" | "mobile" | "auto";

interface PopupProps {
  children: ReactNode;
  placement?: Placement;
  isOpen?: boolean;
  panel: (shouldResponsive?: boolean) => ReactNode;
  mode: "date" | "range";
  getContainer?: HTMLElement | (() => HTMLElement) | string;
  close: () => void;
  toggleAnimate: (animate: boolean) => void;
  animate: boolean;
  inputRef: React.RefObject<HTMLDivElement>;
  responsive?: Responsive;
  isJalaali?: boolean;
}

const Popup = memo(
  ({
    children,
    placement,
    close,
    animate,
    toggleAnimate,
    isOpen,
    panel,
    mode,
    getContainer,
    inputRef,
    responsive,
    isJalaali,
  }: PopupProps) => {
    const refPopup = useRef<HTMLDivElement>(null);

    const shouldResponsive = useShouldResponsive(responsive);

    useClickOutside<HTMLDivElement>(close, [
      refPopup.current,
      inputRef.current,
    ]);

    const config = useConfig({
      element: inputRef,
      placement,
      shouldResponsive,
      mode,
      isJalaali,
    });

    const onAnimationEnd = (e: React.AnimationEvent) => {
      if (e.animationName === "close") {
        e.preventDefault();
        toggleAnimate(false);
      }
    };

    const className = useMemo(() => {
      if (isOpen) {
        return classNames(
          "popup-panel-overlay",
          "popover-panel-open",
          mode === "date"
            ? "popover-panel-date"
            : shouldResponsive
            ? "mobile-popover-panel-range"
            : "popover-panel-range",
          config().animationClassName,
        );
      }
      return classNames(
        "popup-panel-overlay",
        "popover-panel-close",
        config().animationClassName,
      );
    }, [config, isOpen, mode, shouldResponsive]);

    return (
      <Fragment>
        {children}

        {animate && (
          <Portal getContainer={getContainer}>
            <div
              ref={refPopup}
              onAnimationEnd={onAnimationEnd}
              className={className}
              style={{
                ...config().coordinates,
              }}
            >
              {panel(shouldResponsive)}
            </div>
          </Portal>
        )}
      </Fragment>
    );
  },
);

export default Popup;
