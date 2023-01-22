import moment, { Moment } from "moment-jalaali";
import { useCallback } from "react";
import { DateMetadata, useRangeDays, useRangepicker } from "../../../core";
import { dateTransformer, momentTransformer } from "../../../utils";
import { useRangeTemplate } from "../rangePanel/templateContext";
import { HeaderProps, RangeHeader } from "./header";
import { RangeDayPanel } from "./rangeDayPanel";

export interface RangeDaysProps extends HeaderProps {}

const RangeDays = ({}: RangeDaysProps) => {
  const {
    onRangeDaychange,
    cacheRangeDate,
    disabledDates,
    from,
    to,
    isJalaali,
    changeFrom,
    changeTo,
  } = useRangepicker();
  const { type, onChangeMode } = useRangeTemplate();

  const { days } = useRangeDays(type);

  const onSelect = useCallback(
    ({ day, month, year }: DateMetadata) => {
      const isStartDate =
        !cacheRangeDate?.startDate.day ||
        (!!cacheRangeDate.startDate && !!cacheRangeDate.endDate);

      if (!isStartDate) {
        const selectedRange = getRange(
          dateTransformer(cacheRangeDate.startDate, isJalaali),
          dateTransformer({ day, month, year }, isJalaali),
        );

        const firstDisabledIndex = selectedRange.findIndex((item) =>
          disabledDates?.(item),
        );
        if (firstDisabledIndex !== -1) {
          return onRangeDaychange(
            momentTransformer(selectedRange[firstDisabledIndex - 1], isJalaali),
            false,
          );
        }
      }
      onRangeDaychange({ day, month, year }, isStartDate);
      if (isStartDate) {
        to.month !== month && changeFrom({ day, month, year });
      } else {
        from.month !== month && changeTo({ day, month, year });
      }
    },
    [
      cacheRangeDate,
      changeFrom,
      changeTo,
      disabledDates,
      from,
      isJalaali,
      onRangeDaychange,
      to,
    ],
  );

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
          onSelect={onSelect}
        />
      </div>
    </div>
  );
};

export default RangeDays;

function getRange(startDate: Moment, endDate: Moment) {
  const diff = endDate.diff(startDate, "days");
  const range = [];
  for (let i = 0; i < diff; i++) {
    range.push(moment(startDate).add(i, "days"));
  }
  return range;
}
