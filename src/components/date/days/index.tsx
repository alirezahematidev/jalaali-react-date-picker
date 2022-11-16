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
    dayLabels,
  } = useDatepicker();

  const { days: metadataDays } = useDays();
  const today = momentTransformer(moment());

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
      {metadataDays.map(
        ({ id, isNotCurrentMonth, isWeekend, isDisabled, ...date }) => (
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
              isDisabled={isDisabled}
              isToday={isEqual(today, date)}
            />
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
      <DayLabel dayLabelRender={dayLabelRender} />
      <div className="days-body">
        {panelRender ? panelRender({ days, dayLabels, selected }, node) : node}
      </div>
    </Fragment>
  );
};

export { Days };
