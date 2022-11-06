import classNames from "classnames";
import { useLayoutDirection, useLocale } from "../../core";

export const DayLabel = () => {
  const { dayLabels } = useLocale();
  const { isRtl } = useLayoutDirection();

  return (
    <div className="day-label-bar">
      <div
        className={classNames(
          isRtl ? "day-label-bar-inner-rtl" : "day-label-bar-inner-ltr",
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
