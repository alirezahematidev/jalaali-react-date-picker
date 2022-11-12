import { useCallback, useMemo, useState } from "react";
import { HeaderProps } from "../header";
import { useRangeDays, useRangepicker } from "../../core";
import { useRangePanelContext } from "../rangePanel/panelRangeMode";
import { RangeDayPanel } from "./rangeDayPanel";
import { Date } from "../../core/types/global.types";
import { isEqual } from "lodash-es";
import { RangeHeader } from "../rangeHeader";

function validateRangeDates(current: Date, next: Date) {
  if (
    next.day <= current.day ||
    next.month < current.month ||
    next.year < current.year
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

  const [current, setCurrent] = useState<Date | null>(null);

  const { groupedRangeDays } = useRangeDays();

  const { onChangeMode, dayLabelRender, highlightOffDays } =
    useRangePanelContext();

  const onSelect = useCallback(
    (date: Date) => {
      if (!current) {
        return setCurrent(() => date);
      }

      if (validateRangeDates(current, date)) {
        onRangeDaychange({ current, next: date });
        onRangeDateChange({ current, next: date });
        return;
      }
      onRangeDaychange({ current: date, next: null });
      onRangeDateChange({ current: date, next: null });
    },
    [current, onRangeDateChange, onRangeDaychange],
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
              selectedRange={{ current, next: date?.next || null }}
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
