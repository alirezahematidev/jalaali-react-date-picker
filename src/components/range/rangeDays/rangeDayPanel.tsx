import classNames from "classnames";
import { isEqual } from "lodash-es";
import moment from "moment-jalaali";
import { Date, DateMetadata, DateRangePickerTypes } from "../../../core";
import { dateTransformer, momentTransformer } from "../../../utils";
import Day from "../../day";
import { DayLabel } from "../../dayLabel";

interface RangeDayPanelProps {
  days: DateMetadata[];
  dayLabelRender?: DateRangePickerTypes.dayLabelRender;
  highlightOffDays?: DateRangePickerTypes.HighLightOffDays;
  canHighlighWeekend?: boolean;
  selectedRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  onSelect: (date: DateMetadata) => void;
}

export const RangeDayPanel = ({
  days,
  dayLabelRender,
  highlightOffDays,
  onSelect,
  canHighlighWeekend,
  selectedRange,
}: RangeDayPanelProps) => {
  const today = momentTransformer(moment());
  return (
    <div className="range-day-panel-item">
      <DayLabel dayLabelRender={dayLabelRender} />
      <div className="days-body">
        {days.map((day) => {
          const { id, isNotCurrentMonth, isWeekend, isDisabled, ...date } = day;
          return (
            <div
              key={`${id}-${day.month}`}
              className={classNames("day-item-outer")}
            >
              <Day
                day={day.day}
                isDisabled={isDisabled}
                isNotCurrentMonth={isNotCurrentMonth}
                onPress={() => onSelect(day)}
                isBetweenHighlight={
                  isBetweenHighlight(
                    day,
                    selectedRange.startDate,
                    selectedRange.endDate,
                  ) && !isNotCurrentMonth
                }
                isHighlight={
                  selectedRange.startDate && !isNotCurrentMonth
                    ? checkDates(selectedRange.startDate, day) ||
                      checkDates(selectedRange.endDate, day)
                    : false
                }
                isOff={(highlightOffDays?.customDates || [])?.some((d) =>
                  isEqual(d, day),
                )}
                isWeekend={canHighlighWeekend ? isWeekend : false}
                isToday={isEqual(today, date)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

function checkDates(a: Date | null, b: DateMetadata) {
  if (!a) {
    return false;
  }
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

const checkAfter = (start: Date, current: Date) => {
  return dateTransformer({ ...current }).isSameOrAfter(
    dateTransformer({ ...start }),
  );
};
const checkBefore = (end: Date, current: Date) => {
  return dateTransformer({ ...current }).isSameOrBefore(
    dateTransformer({ ...end }),
  );
};

function isBetweenHighlight(
  day: Date,
  startDate: Date | null,
  endDate: Date | null,
) {
  if (!startDate || !endDate || startDate.day === 0 || endDate?.day === 0)
    return false;

  return checkAfter(startDate, day) && checkBefore(endDate, day);
}
