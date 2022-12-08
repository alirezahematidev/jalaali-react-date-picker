import classNames from "classnames";
import { isEqual } from "lodash-es";
import moment from "moment-jalaali";
import {
  Date,
  DateMetadata,
  DateRangePickerTypes,
  useRangepicker,
} from "../../../core";
import { dateTransformer, momentTransformer } from "../../../utils";
import Day from "../../day";
import { DayLabel } from "../../dayLabel";

interface RangeDayPanelProps {
  days: DateMetadata[];
  dayLabelRender?: DateRangePickerTypes.DayLabelRender;
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
  const { isJalaali, dayLabels } = useRangepicker();

  const extendDays = days.map((day) => {
    if (day.isDisabled) {
      const currentIndex = days.findIndex((m) => m.id === day.id);
      const prevIndex = currentIndex - 1;
      const nextIndex = currentIndex + 1;
      const prevDay = prevIndex !== -1 ? days[prevIndex] : null;
      const nextDay = nextIndex !== -1 ? days[nextIndex] : null;

      const isPrevDisabled = prevDay ? prevDay.isDisabled : false;
      const isNextDisabled = nextDay ? nextDay.isDisabled : false;

      const isNeighborsDisabled = isPrevDisabled || isNextDisabled;

      return {
        ...day,
        isNeighborsDisabled,
      };
    }

    return {
      ...day,
      isNeighborsDisabled: false,
    };
  });

  return (
    <div className="range-day-panel-item">
      <DayLabel
        dayLabelRender={dayLabelRender}
        dayLabels={dayLabels}
        isJalaali={isJalaali}
      />
      <div className="days-body">
        {extendDays.map((day) => {
          const {
            id,
            isNotCurrentMonth,
            isWeekend,
            isDisabled,
            isNeighborsDisabled,
            ...date
          } = day;
          return (
            <div
              key={`${id}-${day.month}`}
              className={classNames("day-item-outer")}
            >
              <div
                className={classNames(
                  "day-item-chain",
                  isDisabled && isNeighborsDisabled && "disabled",
                  isBetweenHighlight(
                    day,
                    selectedRange.startDate,
                    selectedRange.endDate,
                    isJalaali,
                  ) &&
                    !isNotCurrentMonth &&
                    "highlight-day",
                )}
              >
                <Day
                  day={day.day}
                  mode="range"
                  startDay={selectedRange.startDate?.day}
                  endDay={selectedRange.endDate?.day}
                  isDisabled={isDisabled}
                  isNeighborsDisabled={isNeighborsDisabled}
                  isNotCurrentMonth={isNotCurrentMonth}
                  onPress={() => onSelect(day)}
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

const checkAfter = (start: Date, current: Date, isJalaali: boolean) => {
  return dateTransformer({ ...current }, isJalaali).isAfter(
    dateTransformer({ ...start }, isJalaali),
  );
};
const checkBefore = (end: Date, current: Date, isJalaali: boolean) => {
  return dateTransformer({ ...current }, isJalaali).isBefore(
    dateTransformer({ ...end }, isJalaali),
  );
};

function isBetweenHighlight(
  day: Date,
  startDate: Date | null,
  endDate: Date | null,
  isJalaali: boolean,
) {
  if (!startDate || !endDate || startDate.day === 0 || endDate?.day === 0)
    return false;

  return (
    checkAfter(startDate, day, isJalaali) &&
    checkBefore(endDate, day, isJalaali)
  );
}
