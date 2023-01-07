import classNames from "classnames";
import { useMemo } from "react";
import { useRangepicker, useRangeTranslation } from "../../../../core";
import { getMonthLabels } from "../../../../utils";

interface SelectedDatesProps {
  isJalaali: boolean;
}

export const SelectedDates = ({ isJalaali }: SelectedDatesProps) => {
  const { t } = useRangeTranslation();
  const { rangeState } = useRangepicker();

  const { startText, endText, isFromDay, isToDay } = useMemo(() => {
    const fromDay = rangeState.startDate?.day || 0;
    const fromMonth = rangeState.startDate?.month || 0;
    const fromYear = rangeState.startDate?.year || 0;
    const toDay = rangeState.endDate?.day || 0;
    const toMonth = rangeState.endDate?.month || 0;
    const toYear = rangeState.endDate?.year || 0;

    const isFromDay = !!fromDay;

    const isToDay = !!(rangeState.endDate && toDay);

    const startText = isFromDay
      ? `${fromDay} ${getMonthLabels(fromMonth, isJalaali)} ${fromYear}`
      : t("startDate");

    const endText = isToDay
      ? `${toDay} ${getMonthLabels(toMonth, isJalaali)} ${toYear}`
      : t("endDate");

    return { startText, endText, isFromDay, isToDay };
  }, [isJalaali, rangeState, t]);

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "row" }}
    >
      <span
        className={classNames(
          "panel-header-date",
          isFromDay && "panel-header-date-selected",
        )}
      >
        {startText}
      </span>
      <span
        className={classNames(
          "panel-header-date",
          isFromDay && "panel-header-date-selected",
        )}
        style={{ marginInline: 4 }}
      >
        {"–"}
      </span>
      <span
        className={classNames(
          "panel-header-date",
          isToDay && "panel-header-date-selected",
        )}
      >
        {endText}
      </span>
    </div>
  );
};
