import classNames from "classnames";
import { isEqual } from "lodash-es";
import { DateRangePickerTypes } from "../../core";
import { Date, DateMetadata } from "../../core/types/global.types";
import { DayLabel } from "../dayLabel";
import Day from "../day";
import { useRangeTemplate } from "../rangePanel/templateContext";

interface RangeDayPanelProps {
  days: DateMetadata[];
  dayLabelRender?: DateRangePickerTypes.dayLabelRender;
  highlightOffDays?: DateRangePickerTypes.HighLightOffDays;
  canHighlighWeekend?: boolean;
  selectedRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  onSelect: (date: Date) => void;
}

function isBetweenHighlight(
  days: DateMetadata[],
  date: Date,
  startDate: Date | null,
  endDate: Date | null,
) {
  if (!startDate || !endDate || startDate.day === 0 || endDate?.day === 0)
    return false;

  if (startDate.month > endDate.month) return false;

  if (startDate.month === endDate.month) {
    if (
      date.day < endDate.day &&
      date.day > startDate.day &&
      date.month === startDate.month
    ) {
      return true;
    }
    return false;
  }

  if (startDate.month < endDate.month) {
    const currentMonthDays = days?.filter(
      ({ isNotCurrentMonth }) => !isNotCurrentMonth,
    );
    if (currentMonthDays[0].month === startDate.month) {
      if (
        date.day > startDate.day &&
        date.day <= currentMonthDays[currentMonthDays.length - 1].day
      ) {
        return true;
      }
      return false;
    } else if (currentMonthDays[0].month === endDate.month) {
      if (date.day >= currentMonthDays[0].day && date.day < endDate.day) {
        return true;
      }
      return false;
    }
    return false;
  }
  return false;
}

export const RangeDayPanel = ({
  days,
  dayLabelRender,
  highlightOffDays,
  onSelect,
  canHighlighWeekend,
  selectedRange,
}: RangeDayPanelProps) => {
  return (
    <div className="range-day-panel-item">
      <DayLabel dayLabelRender={dayLabelRender} />
      <div className="days-body">
        {days.map(({ id, isNotCurrentMonth, isWeekend, ...date }) => (
          <div
            key={`${id}-${date.month}`}
            className={classNames("day-item-outer")}
          >
            <Day
              day={date.day}
              isNotCurrentMonth={isNotCurrentMonth}
              onPress={() => onSelect(date)}
              isBetweenHighlight={
                isBetweenHighlight(
                  days,
                  date,
                  selectedRange.startDate,
                  selectedRange.endDate,
                ) && !isNotCurrentMonth
              }
              isHighlight={
                selectedRange.startDate && !isNotCurrentMonth
                  ? isEqual(selectedRange.startDate, date) ||
                    isEqual(selectedRange.endDate, date)
                  : false
              }
              isOff={(highlightOffDays?.customDates || [])?.some((d) =>
                isEqual(d, date),
              )}
              isWeekend={canHighlighWeekend ? isWeekend : false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
