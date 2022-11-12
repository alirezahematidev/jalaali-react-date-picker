import classNames from "classnames";
import { isEqual } from "lodash-es";
import { DateRangePickerTypes } from "../../core";
import { Date, DateMetadata } from "../../core/types/global.types";
import { DayLabel } from "../dayLabel";
import Day from "../day";

interface RangeDayPanelProps {
  onChangeMode?: (mode: DateRangePickerTypes.Mode) => void;
  days: DateMetadata[];
  dayLabelRender?: DateRangePickerTypes.dayLabelRender;
  highlightOffDays?: DateRangePickerTypes.HighLightOffDays;
  canHighlighWeekend?: boolean;
  selectedRange: {
    current: Date | null;
    next: Date | null;
  };
  onSelect: (date: Date) => void;
}

function isBetweenHighlight(
  days: DateMetadata[],
  date: Date,
  current: Date | null,
  next: Date | null,
) {
  if (!current || !next || current.day === 0 || next?.day === 0) return false;
  console.log({ next });

  if (current.month > next.month) return false;

  if (current.month === next.month) {
    if (
      date.day < next.day &&
      date.day > current.day &&
      date.month === current.month
    ) {
      return true;
    }
    return false;
  }

  if (current.month < next.month) {
    const currentMonthDays = days?.filter(
      ({ isNotCurrentMonth }) => !isNotCurrentMonth,
    );
    if (currentMonthDays[0].month === current.month) {
      if (
        date.day > current.day &&
        date.day <= currentMonthDays[currentMonthDays.length - 1].day
      ) {
        return true;
      }
      return false;
    } else if (currentMonthDays[0].month === next.month) {
      if (date.day >= currentMonthDays[0].day && date.day < next.day) {
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
              isBetweenHighlight={isBetweenHighlight(
                days,
                date,
                selectedRange.current,
                selectedRange.next,
              )}
              isHighlight={
                selectedRange.current && !isNotCurrentMonth
                  ? isEqual(selectedRange.current, date) ||
                    isEqual(selectedRange.next, date)
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
