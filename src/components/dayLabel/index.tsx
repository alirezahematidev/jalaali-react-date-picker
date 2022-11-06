import { gregorianDayLabels, jalaaliDayLabels } from "../../core";
import { useDatepicker } from "../../core/logic/useDatepicker";

export const DayLabel = () => {
  const { isJalaali } = useDatepicker();
  const labels = isJalaali ? jalaaliDayLabels : gregorianDayLabels;
  return (
    <div className="day-label-bar">
      <div
        className="day-label-bar-inner"
        style={{ direction: isJalaali ? "rtl" : "ltr" }}
      >
        {labels.map((char) => (
          <div key={char} className="day-label-item">
            {char}
          </div>
        ))}
      </div>
    </div>
  );
};
