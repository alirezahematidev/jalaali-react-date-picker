import classNames from "classnames";
import { useDatepicker } from "../../core";

export const DayLabel = () => {
  const { isJalaali, dayLabels } = useDatepicker();

  return (
    <div className="day-label-bar">
      <div
        className={classNames(
          isJalaali ? "day-label-bar-inner-rtl" : "day-label-bar-inner-ltr",
        )}
      >
        {dayLabels.map((char) => (
          <div key={char} className="day-label-item">
            {char}
          </div>
        ))}
      </div>
    </div>
  );
};
