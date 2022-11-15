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
  const {
    onRangeDaychange,
    cacheRangeDate,
    disabledDates,
    onRangeMonthchange,
    onRangeIncreaseYear,
    onRangeDecreaseYear,
    from,
    to,
  } = useRangepicker();
  const { type, onChangeMode } = useRangeTemplate();

  const { days } = useRangeDays(type);

  const { dayLabelRender, highlightOffDays } = useRangePanelContext();

  const onSelect = useCallback(
    ({ day, month, year, isNotCurrentMonth }: DateMetadata) => {
      const isStartDate = !cacheRangeDate?.startDate.day;
      if (isNotCurrentMonth) {
        if (cacheRangeDate?.endDate === null) {
          if (from.month - 1 === 0) {
            onRangeMonthchange(12, "from");
            onRangeDecreaseYear();
          }
          if (from.month - 1 === month) {
            onRangeMonthchange(month, "from");
          }
          if (to.month + 1 === 13) {
            isStartDate && onRangeMonthchange(1, "from");
            onRangeMonthchange(isStartDate ? month + 1 : 2, "to");
            onRangeIncreaseYear();
          }
          if (to.month + 1 === month) {
            isStartDate && onRangeMonthchange(month, "from");
            onRangeMonthchange(isStartDate ? month + 1 : month, "to");
          }
        }
      }
      onRangeDaychange({ day, month, year }, isStartDate);
    },
    [
      cacheRangeDate?.endDate,
      cacheRangeDate?.startDate.day,
      from.month,
      onRangeDaychange,
      onRangeDecreaseYear,
      onRangeIncreaseYear,
      onRangeMonthchange,
      to.month,
    ],
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
