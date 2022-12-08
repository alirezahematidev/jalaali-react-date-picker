import classNames from "classnames";
import { isEqual } from "lodash-es";
import moment from "moment-jalaali";
import { Fragment } from "react";
import { Date, useDatepicker, useDays } from "../../../core";
import { momentTransformer } from "../../../utils";
import Day from "../../day";
import { DayLabel } from "../../dayLabel";
import { Header, HeaderProps } from "../header";
import { usePanelContext } from "../panel/panelMode";

export interface DaysProps extends HeaderProps {}

const Days = () => {
  const {
    cacheDate: selected,
    onDaychange,
    onDateChange,
    changePlaceholder,
    dayLabels,
    isJalaali,
  } = useDatepicker();

  const { days: metadataDays } = useDays();
  const today = momentTransformer(moment());

  const {
    onChangeMode,
    panelRender,
    dayLabelRender,
    highlightOffDays,
    toggle,
  } = usePanelContext();

  const days: Date[] = metadataDays.map(({ day, month, year }) => ({
    day,
    month,
    year,
  }));

  const canHighlighWeekend =
    highlightOffDays && highlightOffDays.weekend !== undefined
      ? highlightOffDays.weekend
      : true;

  const extendMetadataDays = metadataDays.map((metadata) => {
    if (metadata.isDisabled) {
      const currentIndex = metadataDays.findIndex((m) => m.id === metadata.id);
      const prevIndex = currentIndex - 1;
      const nextIndex = currentIndex + 1;
      const prevDay = prevIndex !== -1 ? metadataDays[prevIndex] : null;
      const nextDay = nextIndex !== -1 ? metadataDays[nextIndex] : null;

      const isPrevDisabled = prevDay ? prevDay.isDisabled : false;
      const isNextDisabled = nextDay ? nextDay.isDisabled : false;

      const isNeighborsDisabled = isPrevDisabled || isNextDisabled;

      return {
        ...metadata,
        isNeighborsDisabled,
      };
    }

    return {
      ...metadata,
      isNeighborsDisabled: false,
    };
  });

  const node = (
    <Fragment>
      {extendMetadataDays.map(
        ({
          id,
          isNotCurrentMonth,
          isWeekend,
          isDisabled,
          isNeighborsDisabled,
          ...date
        }) => (
          <div
            key={`${id}-${date.month}`}
            className={classNames("day-item-outer")}
            onMouseEnter={() => changePlaceholder(date)}
            onMouseLeave={() => changePlaceholder(null)}
          >
            <div
              className={classNames(
                "day-item-chain",
                isDisabled && isNeighborsDisabled && "disabled",
              )}
            >
              <Day
                day={date.day}
                isNeighborsDisabled={isNeighborsDisabled}
                isNotCurrentMonth={isNotCurrentMonth}
                onPress={() => {
                  onDaychange(date);
                  onDateChange(date);
                  toggle?.();
                }}
                isHighlight={isEqual(selected, date)}
                isOff={(highlightOffDays?.customDates || [])?.some((d) =>
                  isEqual(d, date),
                )}
                isWeekend={canHighlighWeekend ? isWeekend : false}
                isDisabled={isDisabled}
                isToday={isEqual(today, date)}
              />
            </div>
          </div>
        ),
      )}
    </Fragment>
  );

  return (
    <Fragment>
      <Header
        onSelectMonthPicker={() => onChangeMode?.("month")}
        onSelectYearPicker={() => onChangeMode?.("year")}
      />
      <DayLabel
        dayLabelRender={dayLabelRender}
        dayLabels={dayLabels}
        isJalaali={isJalaali}
      />
      <div className="days-body">
        {panelRender ? panelRender({ days, dayLabels, selected }, node) : node}
      </div>
    </Fragment>
  );
};

export { Days };
