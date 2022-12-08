import classnames from "classnames";

interface DayProps {
  day: number;
  isHighlight?: boolean;
  isWeekend?: boolean;
  isDisabled?: boolean;
  isOff?: boolean;
  isNotCurrentMonth?: boolean;
  isBetweenHighlight?: boolean;
  isToday?: boolean;
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
  isBetweenHighlight,
  isNotCurrentMonth,
  isToday,
  onMouseEnter,
  onMouseLeave,
}: DayProps) => {
  return (
    <div
      className={classnames(
        "day",
        isDisabled && "disabled",
        isNotCurrentMonth && "not-current",
        isWeekend && "weekend-day",
        isBetweenHighlight && "highlight-day",
        isOff && "off-day",
        isHighlight && "highlight",
        !isHighlight && !isDisabled && "hovered",
        isToday && "today",
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
