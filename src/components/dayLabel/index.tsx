import classNames from "classnames";
import { PanelProps, useDatepicker } from "../../core";

interface DayLabelProps extends Pick<PanelProps, "renderDayLabel"> {}

export const DayLabel = ({ renderDayLabel }: DayLabelProps) => {
  const { isJalaali, dayLabels } = useDatepicker();

  const node = (
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
  );

  return (
    <div className="day-label-bar">
      {renderDayLabel ? renderDayLabel(dayLabels, node) : node}
    </div>
  );
};
