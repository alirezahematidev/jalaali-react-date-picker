import { jalaaliDayLabels } from "../../core";

export const DayLabel = () => {
  return (
    <div className="day-label-bar">
      <div className="day-label-bar-inner">
        {jalaaliDayLabels.map((char) => (
          <div key={char} className="day-label-item">
            {char}
          </div>
        ))}
      </div>
    </div>
  );
};
