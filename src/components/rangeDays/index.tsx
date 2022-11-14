import { useCallback, useState } from "react";
import { HeaderProps } from "../header";
import { useRangeDays, useRangepicker } from "../../core";
import { useRangePanelContext } from "../rangePanel/panelRangeMode";
import { RangeDayPanel } from "./rangeDayPanel";
import { Date } from "../../core/types/global.types";
import { RangeHeader } from "../rangeHeader/header";
import { useRangeTemplate } from "../rangePanel/templateContext";

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

export interface RangeDaysProps extends HeaderProps {}

const RangeDays = ({}: RangeDaysProps) => {
  const {
    onRangeDateChange,
    onRangeDaychange,
    cacheRangeDate: date,
  } = useRangepicker();

  const { type, onChangeMode } = useRangeTemplate();

  const [startDate, setStartDate] = useState<Date | null>(null);

  const { days } = useRangeDays(type);

  const { dayLabelRender, highlightOffDays } = useRangePanelContext();

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
        onSelectYearPicker={() => {
          onChangeMode?.("year");
        }}
      />
      <div className="range-day-panel">
        <RangeDayPanel
          days={days}
          selectedRange={{ startDate, endDate: date?.endDate || null }}
          canHighlighWeekend={canHighlighWeekend}
          dayLabelRender={dayLabelRender}
          highlightOffDays={highlightOffDays}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
};

export { RangeDays };
