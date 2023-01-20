import classNames from "classnames";
import { MouseEvent } from "react";

interface IconProps {
  size?: number;
  onClick?: (e?: MouseEvent<HTMLDivElement>) => void;
  isJalaali?: boolean;
  hoverEffect?: boolean;
  disabled?: boolean;
}

const Icon = () => null;

const Forward = ({ size = 20, onClick, disabled }: IconProps) => {
  return (
    <div
      className={classNames(
        "icon",
        "icon-forward",
        disabled && "panel-icon-disabled",
      )}
      style={{ width: size, height: "100%", fontSize: size }}
      onClick={() => {
        if (disabled) return;

        onClick?.();
      }}
      onTouchStart={() => {
        if (disabled) return;

        onClick?.();
      }}
    />
  );
};

const Calendar = ({ size = 20, onClick, disabled }: IconProps) => {
  return (
    <div
      className={classNames(
        "icon",
        "icon-calendar",
        disabled && "panel-icon-disabled",
      )}
      style={{ width: size, height: "100%", fontSize: size }}
      onClick={() => {
        if (disabled) return;

        onClick?.();
      }}
      onTouchStart={() => {
        if (disabled) return;

        onClick?.();
      }}
    />
  );
};

const CalendarToday = ({ size = 20, onClick, disabled }: IconProps) => {
  return (
    <div
      className={classNames(
        "icon",
        "icon-calendar-today",
        disabled && "panel-icon-disabled",
      )}
      style={{ width: size, height: "100%", fontSize: size }}
      onClick={() => {
        if (disabled) return;

        onClick?.();
      }}
      onTouchStart={() => {
        if (disabled) return;

        onClick?.();
      }}
    />
  );
};

const ChevronLeft = ({
  size = 20,
  onClick,
  hoverEffect,
  disabled,
}: IconProps) => {
  return (
    <div
      className={classNames(
        "panel-icon",
        "icon-chevron-left",
        hoverEffect && !disabled && "panel-icon-hovered",
        disabled && "panel-icon-disabled",
      )}
      style={{ width: size + 4, height: size + 4, fontSize: size }}
      onClick={() => {
        if (disabled) return;

        onClick?.();
      }}
      onTouchStart={() => {
        if (disabled) return;

        onClick?.();
      }}
    />
  );
};

const ChevronRight = ({
  size = 20,
  onClick,
  hoverEffect,
  disabled,
}: IconProps) => {
  return (
    <div
      className={classNames(
        "panel-icon",
        "icon-chevron-right",
        hoverEffect && !disabled && "panel-icon-hovered",
        disabled && "panel-icon-disabled",
      )}
      style={{ width: size + 4, height: size + 4, fontSize: size }}
      onClick={() => {
        if (disabled) return;

        onClick?.();
      }}
      onTouchStart={() => {
        if (disabled) return;

        onClick?.();
      }}
    />
  );
};

const Chevron = ({
  size = 20,
  onClick,
  isJalaali,
  hoverEffect,
  disabled,
}: IconProps) => {
  return (
    <div
      className={classNames(
        "panel-icon",
        isJalaali ? "icon-chevron-right" : "icon-chevron-left",
        hoverEffect && !disabled && "panel-icon-hovered",
        disabled && "panel-icon-disabled",
      )}
      style={{ width: size + 4, height: size + 4, fontSize: size }}
      onClick={() => {
        if (disabled) return;

        onClick?.();
      }}
      onTouchStart={() => {
        if (disabled) return;

        onClick?.();
      }}
    />
  );
};

const Clear = ({ size = 20, onClick, disabled }: IconProps) => {
  return (
    <div
      className={classNames(
        "icon",
        "icon-highlight_off",
        disabled && "panel-icon-disabled",
      )}
      style={{ width: size, height: "100%", fontSize: size }}
      onClick={() => {
        if (disabled) return;

        onClick?.();
      }}
      onTouchStart={() => {
        if (disabled) return;

        onClick?.();
      }}
    />
  );
};

const DoubleChevronLeft = ({
  size = 20,
  onClick,
  hoverEffect,
  disabled,
}: IconProps) => {
  return (
    <div
      className={classNames(
        "panel-icon",
        "icon-keyboard_double_arrow_left",
        hoverEffect && !disabled && "panel-icon-hovered",
        disabled && "panel-icon-disabled",
      )}
      style={{ width: size + 4, height: size + 4, fontSize: size }}
      onClick={() => {
        if (disabled) return;

        onClick?.();
      }}
      onTouchStart={() => {
        if (disabled) return;

        onClick?.();
      }}
    />
  );
};

const DoubleChevronRight = ({
  size = 20,
  onClick,
  hoverEffect,
  disabled,
}: IconProps) => {
  return (
    <div
      className={classNames(
        "panel-icon",
        "icon-keyboard_double_arrow_right",
        hoverEffect && !disabled && "panel-icon-hovered",
        disabled && "panel-icon-disabled",
      )}
      style={{ width: size + 4, height: size + 4, fontSize: size }}
      onClick={() => {
        if (disabled) return;

        onClick?.();
      }}
      onTouchStart={() => {
        if (disabled) return;

        onClick?.();
      }}
    />
  );
};

const DoubleChevron = ({
  size = 20,
  onClick,
  isJalaali,
  hoverEffect,
  disabled,
}: IconProps) => {
  return (
    <div
      className={classNames(
        "panel-icon",
        isJalaali
          ? "icon-keyboard_double_arrow_right"
          : "icon-keyboard_double_arrow_left",
        hoverEffect && !disabled && "panel-icon-hovered",
        disabled && "panel-icon-disabled",
      )}
      style={{ width: size + 4, height: size + 4, fontSize: size }}
      onClick={() => {
        if (disabled) return;

        onClick?.();
      }}
      onTouchStart={() => {
        if (disabled) return;

        onClick?.();
      }}
    />
  );
};

const Back = ({ size = 20, onClick, disabled }: IconProps) => {
  return (
    <div
      className={classNames(
        "icon",
        "icon-arrow_back",
        disabled && "panel-icon-disabled",
      )}
      style={{ width: size, height: "100%", fontSize: size }}
      onClick={() => {
        if (disabled) return;

        onClick?.();
      }}
      onTouchStart={() => {
        if (disabled) return;

        onClick?.();
      }}
    />
  );
};
const Dropdown = ({ size = 20, onClick, hoverEffect, disabled }: IconProps) => {
  return (
    <div
      className={classNames(
        "panel-icon",
        "icon-arrow_drop_down",
        hoverEffect && !disabled && "panel-icon-hovered",
        disabled && "panel-icon-disabled",
      )}
      style={{ width: size + 4, height: size + 4, fontSize: size }}
      onClick={() => {
        if (disabled) return;

        onClick?.();
      }}
      onTouchStart={() => {
        if (disabled) return;

        onClick?.();
      }}
    />
  );
};
const Error = ({ size = 20, onClick, hoverEffect, disabled }: IconProps) => {
  return (
    <div
      className={classNames(
        "icon",
        "icon-error",
        hoverEffect && !disabled && "panel-icon-hovered",
        disabled && "panel-icon-disabled",
      )}
      style={{ width: size, height: "100%", fontSize: size }}
      onClick={() => {
        if (disabled) return;

        onClick?.();
      }}
      onTouchStart={() => {
        if (disabled) return;

        onClick?.();
      }}
    />
  );
};

Icon.Forward = Forward;
Icon.Calendar = Calendar;
Icon.Back = Back;
Icon.DoubleChevronRight = DoubleChevronRight;
Icon.DoubleChevronLeft = DoubleChevronLeft;
Icon.Clear = Clear;
Icon.ChevronRight = ChevronRight;
Icon.ChevronLeft = ChevronLeft;
Icon.CalendarToday = CalendarToday;
Icon.Chevron = Chevron;
Icon.DoubleChevron = DoubleChevron;
Icon.Dropdown = Dropdown;
Icon.Error = Error;

export { Icon };
