import classNames from "classnames";
import moment from "moment-jalaali";
import { Fragment } from "react";
import { Date, useDatepicker, useDays } from "../../../core";
import { dateTransformer, isEqual, momentTransformer } from "../../../utils";
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
  const today = momentTransformer(moment(), isJalaali);

  const {
    onChangeMode,
    panelRender,
    dayLabelRender,
    highlightDays,
    toggle,
    highlightWeekend,
    presets,
  } = usePanelContext();

  const days: Date[] = metadataDays.map(({ day, month, year }) => ({
    day,
    month,
    year,
  }));

  const canHighlighWeekend =
    highlightWeekend !== undefined ? highlightWeekend : true;

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
            onMouseEnter={() => {
              if (isDisabled || !presets) return;
              changePlaceholder(date);
            }}
            onMouseLeave={() => {
              if (!presets) return;

              changePlaceholder(null);
            }}
          >
            <div
              className={classNames("day-item-chain", isDisabled && "disabled")}
            >
              <Day
                day={date.day}
                mode="date"
                isJalaali={isJalaali}
                isNeighborsDisabled={isNeighborsDisabled}
                isNotCurrentMonth={isNotCurrentMonth}
                onPress={() => {
                  onDaychange(date);
                  onDateChange(date);
                  toggle?.();
                }}
                isSelected={isEqual(selected, date)}
                isHighlight={
                  typeof highlightDays === "function"
                    ? highlightDays(dateTransformer(date, isJalaali))
                    : (highlightDays || [])?.some((d) =>
                        d.isSame(dateTransformer(date, isJalaali), "day"),
                      )
                }
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

export default Days;
