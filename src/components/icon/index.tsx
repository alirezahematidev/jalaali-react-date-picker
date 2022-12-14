interface IconProps {
  size?: number;
}

const Icon = () => null;

const Forward = ({ size = 18 }: IconProps) => {
  return (
    <div className="icon icon-forward" style={{ width: size, height: size }} />
  );
};

const Calendar = ({ size = 18 }: IconProps) => {
  return (
    <div className="icon icon-calendar" style={{ width: size, height: size }} />
  );
};

const CalendarToday = ({ size = 18 }: IconProps) => {
  return (
    <div
      className="icon icon-calendar-today"
      style={{ width: size, height: size }}
    />
  );
};

const ChevronLeft = ({ size = 18 }: IconProps) => {
  return (
    <div
      className="icon icon-chevron-left"
      style={{ width: size, height: size }}
    />
  );
};

const ChevronRight = ({ size = 18 }: IconProps) => {
  return (
    <div
      className="icon icon-chevron-right"
      style={{ width: size, height: size }}
    />
  );
};

const Clear = ({ size = 18 }: IconProps) => {
  return (
    <div className="icon icon-clear" style={{ width: size, height: size }} />
  );
};

const DoubleChevronLeft = ({ size = 18 }: IconProps) => {
  return (
    <div
      className="icon icon-keyboard_double_arrow_left"
      style={{ width: size, height: size }}
    />
  );
};

const DoubleChevronRight = ({ size = 18 }: IconProps) => {
  return (
    <div
      className="icon icon-keyboard_double_arrow_right"
      style={{ width: size, height: size }}
    />
  );
};

const Back = ({ size = 18 }: IconProps) => {
  return (
    <div
      className="icon icon-arrow_back"
      style={{ width: size, height: size }}
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
