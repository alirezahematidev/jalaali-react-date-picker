import { useCallback } from "react";
import { HeaderProps } from "../header";
import { useRangeDays, useRangepicker } from "../../core";
import { useRangePanelContext } from "../rangePanel/panelRangeMode";
import { RangeDayPanel } from "./rangeDayPanel";
import { DateMetadata } from "../../core/types/global.types";
import { useRangeTemplate } from "../rangePanel/templateContext";
import { RangeHeader } from "./header";

export interface RangeDaysProps extends HeaderProps {}

const RangeDays = ({}: RangeDaysProps) => {
  const { onRangeDaychange, cacheRangeDate, disabledDates } = useRangepicker();
  const { type, onChangeMode } = useRangeTemplate();

  const { days } = useRangeDays(type);

  const { dayLabelRender, highlightOffDays } = useRangePanelContext();

  const onSelect = useCallback(
    ({ day, month, year }: DateMetadata) => {
      // if (validateRangeDates(startDate, date)) {
      onRangeDaychange({ day, month, year }, !cacheRangeDate?.startDate.day);
      // onRangeDateChange({ startDate, endDate: date });
      // return;
      // }
      // onRangeDaychange({ startDate: date, endDate: null }, type);
      // onRangeDateChange({ startDate: date, endDate: null });
    },
    [cacheRangeDate?.startDate.day, onRangeDaychange],
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
          selectedRange={{
            startDate: cacheRangeDate?.startDate || null,
            endDate: cacheRangeDate?.endDate || null,
          }}
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
