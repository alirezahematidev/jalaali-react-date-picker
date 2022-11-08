import { isEqual } from "lodash-es";
import classNames from "classnames";
import Day from "../day";
import { DayLabel } from "../dayLabel";
import { Header, HeaderProps } from "../header";
import { useDatepicker } from "../../core";
import { usePanelContext } from "../panel/panelMode";
import { Fragment } from "react";
import { Date } from "../../core/types/global.types";

export interface DaysProps extends HeaderProps {}

const Days = () => {
  const {
    days: metadataDays,
    cacheDate: selected,
    onDaychange,
    onDateChange,
    dayLabels,
  } = useDatepicker();

  const { onChangeMode, panelRender, dayLabelRender, highlightOffDays } =
    usePanelContext();

  const days: Date[] = metadataDays.map(({ day, month, year }) => ({
    day,
    month,
    year,
  }));

  const canHighlighWeekend =
    highlightOffDays && highlightOffDays.weekend !== undefined
      ? highlightOffDays.weekend
      : true;

  const node = (
    <Fragment>
      {metadataDays.map(({ id, isNotCurrentMonth, isWeekend, ...date }) => (
        <div
          key={`${id}-${date.month}`}
          className={classNames("day-item-outer")}
        >
          <Day
            day={date.day}
            isNotCurrentMonth={isNotCurrentMonth}
            onPress={() => {
              onDaychange(date);
              onDateChange(date);
            }}
            isHighlight={isEqual(selected, date)}
            isOff={(highlightOffDays?.customDates || [])?.some((d) =>
              isEqual(d, date),
            )}
            isWeekend={canHighlighWeekend ? isWeekend : false}
          />
        </div>
      ))}
    </Fragment>
  );

  return (
    <Fragment>
      <Header
        onSelectMonthPicker={() => onChangeMode?.("month")}
        onSelectYearPicker={() => onChangeMode?.("year")}
      />
      <DayLabel dayLabelRender={dayLabelRender} />
      <div className="days-body">
        {panelRender ? panelRender({ days, dayLabels, selected }, node) : node}
      </div>
    </Fragment>
  );
};

export { Days };
