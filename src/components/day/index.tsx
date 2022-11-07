import classnames from "classnames";

interface DayProps {
  day: number;
  isHighlight?: boolean;
  isWeekend?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
}

const Day = ({
  day,
  isDisabled,
  isHighlight,
  isWeekend,
  onPress,
}: DayProps) => {
  return (
    <div
      className={classnames(
        "day",
        isHighlight && "highlight",
        isDisabled && "disabled",
        isWeekend && "weekend-day",
      )}
      onClick={onPress}
    >
      <span>{day}</span>
    </div>
  );
};

export default Day;
