import classnames from "classnames";

interface DayProps {
  day: number;
  isHighlight?: boolean;
  isWeekend?: boolean;
  isDisabled?: boolean;
  isOff?: boolean;
  onPress?: () => void;
}

const Day = ({
  day,
  isDisabled,
  isHighlight,
  isWeekend,
  onPress,
  isOff,
}: DayProps) => {
  return (
    <div
      className={classnames(
        "day",
        isHighlight && "highlight",
        isDisabled && "disabled",
        isWeekend && "weekend-day",
        isOff && "off-day",
      )}
      onClick={onPress}
    >
      <span>{day}</span>
    </div>
  );
};

export default Day;
