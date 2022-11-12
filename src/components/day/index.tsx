import classnames from "classnames";

interface DayProps {
  day: number;
  isHighlight?: boolean;
  isWeekend?: boolean;
  isDisabled?: boolean;
  isOff?: boolean;
  isNotCurrentMonth?: boolean;
  isBetweenHighlight?: boolean;
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
}: DayProps) => {
  return (
    <div
      className={classnames(
        "day",
        isHighlight && "highlight",
        !isHighlight && !isDisabled && "hovered",
        isDisabled && "disabled",
        isNotCurrentMonth && "not-current",
        isWeekend && "weekend-day",
        isBetweenHighlight && "highlight-day",
        isOff && "off-day",
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
