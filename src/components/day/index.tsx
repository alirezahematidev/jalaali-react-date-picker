import classnames from "classnames";

interface DayProps {
  day: number;
  isHighlight?: boolean;
  isOffDay?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
}

const Day = ({ day, isDisabled, isHighlight, isOffDay, onPress }: DayProps) => {
  return (
    <div
      className={classnames(
        "day",
        isHighlight && "highlight",
        isDisabled && "disabled",
        isOffDay && "off-day",
      )}
      onClick={onPress}
    >
      <span>{day}</span>
    </div>
  );
};

export default Day;
