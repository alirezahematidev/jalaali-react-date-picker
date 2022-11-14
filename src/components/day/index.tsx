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
    >
      <span>{day}</span>
    </div>
  );
};

export default Day;