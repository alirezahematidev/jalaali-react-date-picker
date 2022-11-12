import classNames from "classnames";
import { PanelProps, useDatepicker } from "../../core";

interface DayLabelProps extends Pick<PanelProps, "dayLabelRender"> {}

export const DayLabel = ({ dayLabelRender }: DayLabelProps) => {
  const { isJalaali, dayLabels } = useDatepicker();
  console.log({ dayLabelRender });
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
