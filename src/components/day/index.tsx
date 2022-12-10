import classnames from "classnames";

interface DayProps {
  day: number;
  startDay?: number;
  endDay?: number;
  isHighlight?: boolean;
  isWeekend?: boolean;
  isDisabled?: boolean;
  isOff?: boolean;
  isNotCurrentMonth?: boolean;
  isToday?: boolean;
  isNeighborsDisabled?: boolean;
  mode?: "date" | "range";
  onPress?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const Day = ({
  day,
  isDisabled,
  isHighlight,
  isWeekend,
  onPress,
  isOff,
  isNotCurrentMonth,
  isToday,
  onMouseEnter,
  onMouseLeave,
  isNeighborsDisabled,
  mode,
  endDay,
  startDay,
}: DayProps) => {
  return (
    <div
      className={classnames(
        "day",
        isDisabled && !isNeighborsDisabled && "disabled",
        isNotCurrentMonth && "not-current",
        isWeekend && "weekend-day",
        isOff && "off-day",
        isHighlight && "highlight",
        !isHighlight && !isDisabled && "hovered",
        isToday && "today",
        mode === "range" &&
          isHighlight &&
          day === startDay &&
          endDay &&
          "start-tail-highlight",

        mode === "range" &&
          isHighlight &&
          day === endDay &&
          "end-tail-highlight",
      )}
      onClick={() => {
        if (isDisabled) return;
        onPress?.();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span>{day}</span>
    </div>
  );
};

export default Day;
