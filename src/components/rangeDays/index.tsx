import { useCallback } from "react";
import { HeaderProps } from "../header";
import { useRangeDays, useRangepicker } from "../../core";
import { useRangePanelContext } from "../rangePanel/panelRangeMode";
import { RangeDayPanel } from "./rangeDayPanel";
import { DateMetadata } from "../../core/types/global.types";
import { useRangeTemplate } from "../rangePanel/templateContext";
import { RangeHeader } from "./header";
import moment, { Moment } from "moment-jalaali";
import { dateTransformer, momentTransformer } from "../../utils";

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
      const isStartDate =
        !cacheRangeDate?.startDate.day ||
        (!!cacheRangeDate.startDate && !!cacheRangeDate.endDate);
      if (!isStartDate) {
        const selectedRange = getRange(
          dateTransformer(cacheRangeDate.startDate),
          dateTransformer({ day, month, year }),
        );
        const firstDisabledIndex = selectedRange.findIndex((item) =>
          disabledDates?.(item),
        );
        if (firstDisabledIndex !== -1) {
          return onRangeDaychange(
            momentTransformer(selectedRange[firstDisabledIndex - 1]),
            false,
          );
        }
      }
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
      cacheRangeDate?.startDate,
      disabledDates,
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

function getRange(startDate: Moment, endDate: Moment) {
  console.log("startDate.toISOString", startDate.toISOString());
  console.log("endDate.toISOString", endDate.toISOString());
  const diff = endDate.diff(startDate, "days");
  const range = [];
  for (let i = 0; i < diff; i++) {
    range.push(moment(startDate).add(i, "days"));
  }
  return range;
}
