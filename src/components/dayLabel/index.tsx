import classNames from "classnames";
import { PickerProps } from "../../core";

interface DayLabelProps extends Pick<PickerProps, "dayLabelRender"> {
  dayLabels: string[];
  isJalaali: boolean;
}

export const DayLabel = ({
  dayLabelRender,
  dayLabels,
  isJalaali,
}: DayLabelProps) => {
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
      {dayLabelRender ? dayLabelRender(dayLabels, node) : node}
      {/* {node} */}
    </div>
  );
};
