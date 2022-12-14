import { MouseEvent } from "react";

interface IconProps {
  size?: number;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

const Icon = () => null;

const Forward = ({ size = 20, onClick }: IconProps) => {
  return (
    <div
      className="icon icon-forward"
      onClick={onClick}
      style={{ width: size, height: size, fontSize: size }}
    />
  );
};

const Calendar = ({ size = 20, onClick }: IconProps) => {
  return (
    <div
      className="icon icon-calendar"
      onClick={onClick}
      style={{ width: size, height: size, fontSize: size }}
    />
  );
};

const CalendarToday = ({ size = 20, onClick }: IconProps) => {
  return (
    <div
      className="icon icon-calendar-today"
      style={{ width: size, height: size, fontSize: size }}
      onClick={onClick}
    />
  );
};

const ChevronLeft = ({ size = 20, onClick }: IconProps) => {
  return (
    <div
      className="icon icon-chevron-left"
      style={{ width: size, height: size, fontSize: size }}
      onClick={onClick}
    />
  );
};

const ChevronRight = ({ size = 20, onClick }: IconProps) => {
  return (
    <div
      className="icon icon-chevron-right"
      style={{ width: size, height: size, fontSize: size }}
      onClick={onClick}
    />
  );
};

const Clear = ({ size = 20, onClick }: IconProps) => {
  return (
    <div
      className="icon icon-clear"
      style={{ width: size, height: size, fontSize: size }}
      onClick={onClick}
    />
  );
};

const DoubleChevronLeft = ({ size = 20, onClick }: IconProps) => {
  return (
    <div
      className="icon icon-keyboard_double_arrow_left"
      style={{ width: size, height: size, fontSize: size }}
      onClick={onClick}
    />
  );
};

const DoubleChevronRight = ({ size = 20, onClick }: IconProps) => {
  return (
    <div
      className="icon icon-keyboard_double_arrow_right"
      style={{ width: size, height: size, fontSize: size }}
      onClick={onClick}
    />
  );
};

const Back = ({ size = 20, onClick }: IconProps) => {
  return (
    <div
      className="icon icon-arrow_back"
      style={{ width: size, height: size, fontSize: size }}
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

export { Icon };
