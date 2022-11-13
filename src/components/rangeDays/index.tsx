import { useCallback, useMemo, useState } from "react";
import { HeaderProps } from "../header";
import { useRangeDays, useRangepicker } from "../../core";
import { useRangePanelContext } from "../rangePanel/panelRangeMode";
import { RangeDayPanel } from "./rangeDayPanel";
import { Date } from "../../core/types/global.types";
import { isEqual } from "lodash-es";
import { RangeHeader } from "../rangeHeader";

function validateRangeDates(startDate: Date, endDate: Date) {
  if (
    endDate.day <= startDate.day ||
    endDate.month < startDate.month ||
    endDate.year < startDate.year
  ) {
    return false;
  }
  return true;
}

export interface DaysProps extends HeaderProps {}

const RangeDays = () => {
  const {
    onRangeDateChange,
    onRangeDaychange,
    cacheRangeDate: date,
  } = useRangepicker();

  const [startDate, setStartDate] = useState<Date | null>(null);

  const { groupedRangeDays } = useRangeDays();

  const { onChangeMode, dayLabelRender, highlightOffDays } =
    useRangePanelContext();

  const onSelect = useCallback(
    (date: Date) => {
      if (!startDate) {
        return setStartDate(() => date);
      }

      if (validateRangeDates(startDate, date)) {
        onRangeDaychange({ startDate, endDate: date });
        onRangeDateChange({ startDate, endDate: date });
        return;
      }
      onRangeDaychange({ startDate: date, endDate: null });
      onRangeDateChange({ startDate: date, endDate: null });
    },
    [startDate, onRangeDateChange, onRangeDaychange],
  );

  // const {} = useMemo(() => {}, []);

  const canHighlighWeekend =
    highlightOffDays && highlightOffDays.weekend !== undefined
      ? highlightOffDays.weekend
      : true;

  return (
    <div className="range-day-wrapper">
      <RangeHeader
        onSelectMonthPicker={() => onChangeMode?.("month")}
        onSelectYearPicker={() => onChangeMode?.("year")}
      />
      <div className="range-day-panel">
        {groupedRangeDays.map((days, index) => {
          return (
            <RangeDayPanel
              key={index}
              days={days}
              selectedRange={{ startDate, endDate: date?.endDate || null }}
              canHighlighWeekend={canHighlighWeekend}
              dayLabelRender={dayLabelRender}
              highlightOffDays={highlightOffDays}
              onChangeMode={onChangeMode}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </div>
  );
};

export { RangeDays };
