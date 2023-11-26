import classNames from "classnames";
import { MouseEvent } from "react";

interface IconProps {
  size?: number;
  onClick?: (e?: MouseEvent<HTMLDivElement>) => void;
  isJalaali?: boolean;
  hoverEffect?: boolean;
}

const Icon = () => null;

const Forward = ({ size = 20, onClick }: IconProps) => {
  return (
    <div
      className={classNames("icon", "icon-forward")}
      onClick={onClick}
      style={{ width: size, height: "100%", fontSize: size }}
    />
  );
};

const Calendar = ({ size = 20, onClick }: IconProps) => {
  return (
    <div
      className="icon icon-calendar"
      onClick={onClick}
      style={{ width: size, height: "100%", fontSize: size }}
    />
  );
};

const CalendarToday = ({ size = 20, onClick }: IconProps) => {
  return (
    <div
      className="icon icon-calendar-today"
      style={{ width: size, height: "100%", fontSize: size }}
      onClick={onClick}
    />
  );
};

const ChevronLeft = ({ size = 20, onClick, hoverEffect }: IconProps) => {
  return (
    <div
      className={classNames(
        "panel-icon",
        "icon-chevron-left",
        hoverEffect && "panel-icon-hovered",
      )}
      style={{ width: size + 4, height: size + 4, fontSize: size }}
      onClick={onClick}
    />
  );
};

const ChevronRight = ({ size = 20, onClick, hoverEffect }: IconProps) => {
  return (
    <div
      className={classNames(
        "panel-icon",
        "icon-chevron-right",
        hoverEffect && "panel-icon-hovered",
      )}
      style={{ width: size + 4, height: size + 4, fontSize: size }}
      onClick={onClick}
    />
  );
};

const Chevron = ({ size = 20, onClick, isJalaali, hoverEffect }: IconProps) => {
  return (
    <div
      className={classNames(
        "panel-icon",
        isJalaali ? "icon-chevron-right" : "icon-chevron-left",
        hoverEffect && "panel-icon-hovered",
      )}
      style={{ width: size + 4, height: size + 4, fontSize: size }}
      onClick={onClick}
    />
  );
};

const Clear = ({ size = 20, onClick }: IconProps) => {
  return (
    <div
      className="icon icon-highlight_off"
      style={{ width: size, height: "100%", fontSize: size }}
      onClick={onClick}
    />
  );
};

const DoubleChevronLeft = ({ size = 20, onClick, hoverEffect }: IconProps) => {
  return (
    <div
      className={classNames(
        "panel-icon",
        "icon-keyboard_double_arrow_left",
        hoverEffect && "panel-icon-hovered",
      )}
      style={{ width: size + 4, height: size + 4, fontSize: size }}
      onClick={onClick}
    />
  );
};

const DoubleChevronRight = ({ size = 20, onClick, hoverEffect }: IconProps) => {
  return (
    <div
      className={classNames(
        "panel-icon",
        "icon-keyboard_double_arrow_right",
        hoverEffect && "panel-icon-hovered",
      )}
      style={{ width: size + 4, height: size + 4, fontSize: size }}
      onClick={onClick}
    />
  );
};

const DoubleChevron = ({
  size = 20,
  onClick,
  isJalaali,
  hoverEffect,
}: IconProps) => {
  return (
    <div
      className={classNames(
        "panel-icon",
        isJalaali
          ? "icon-keyboard_double_arrow_right"
          : "icon-keyboard_double_arrow_left",
        hoverEffect && "panel-icon-hovered",
      )}
      style={{ width: size + 4, height: size + 4, fontSize: size }}
      onClick={onClick}
    />
  );
};

const Back = ({ size = 20, onClick }: IconProps) => {
  return (
    <div
      className="icon icon-arrow_back"
      style={{ width: size, height: "100%", fontSize: size }}
      onClick={onClick}
    />
  );
};
const Dropdown = ({ size = 20, onClick, hoverEffect }: IconProps) => {
  return (
    <div
      className={classNames(
        "panel-icon",
        "icon-arrow_drop_down",
        hoverEffect && "panel-icon-hovered",
      )}
      style={{ width: size + 4, height: size + 4, fontSize: size }}
      onClick={onClick}
    />
  );
};
const Error = ({ size = 20, onClick, hoverEffect }: IconProps) => {
  return (
    <div
      className={classNames(
        "icon",
        "icon-error",
        hoverEffect && "panel-icon-hovered",
      )}
      style={{ width: size, height: "100%", fontSize: size }}
      onClick={onClick}
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
