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
    dayLabels,
    canHighlighWeekend,
  } = useDatepicker();
  const { onChangeMode, renderPanel } = usePanelContext();

  const days: Date[] = metadataDays.map(({ day, month, year }) => ({
    day,
    month,
    year,
  }));

  const node = (
    <Fragment>
      <DayLabel />
      <div className="days-body">
        {metadataDays.map(
          ({ id, isNotCurrentMonth, isWeekend, isOff, ...date }) => (
            <div
              key={`${id}-${date.month}`}
              className={classNames("day-item-outer")}
            >
              <Day
                day={date.day}
                isDisabled={isNotCurrentMonth}
                onPress={() => onDaychange(date)}
                isHighlight={isEqual(selected, date)}
                isOff={isOff}
                isWeekend={canHighlighWeekend ? isWeekend : false}
              />
            </div>
          ),
        )}
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <Header
        onSelectMonthPicker={() => onChangeMode?.("month")}
        onSelectYearPicker={() => onChangeMode?.("year")}
      />
      {renderPanel ? renderPanel({ days, dayLabels, selected }, node) : node}
    </Fragment>
  );
};

export { Days };
