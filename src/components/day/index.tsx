import classnames from "classnames";

interface DayProps {
  day: number;
  startDay?: number;
  endDay?: number;
  isSelected?: boolean;
  isWeekend?: boolean;
  isDisabled?: boolean;
  isHighlight?: boolean;
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
  isSelected,
  isWeekend,
  onPress,
  isHighlight,
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
        isHighlight && "off-day",
        isSelected && "highlight",
        !isSelected && !isDisabled && "hovered",
        isToday && "today",
        mode === "range" &&
          isSelected &&
          day === startDay &&
          endDay &&
          "start-tail-highlight",

        mode === "range" &&
          isSelected &&
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
