import { isEqual } from "lodash-es";
import { useDatepicker } from "../../core/logic/useDatepicker";
import classNames from "classnames";
import Day from "../day";
import { DayLabel } from "../dayLabel";
import { Header, HeaderProps } from "../header";
import { useIsWeekend } from "../../core";

export interface DaysProps extends HeaderProps {
  onChangeMode?: (mode: "month" | "year") => void;
}

const Days = ({ onChangeMode }: DaysProps) => {
  const { days, onDaychange, cacheDate, isJalaali } = useDatepicker();

  const { isWeekend } = useIsWeekend();

  return (
    <>
      <Header
        onSelectMonthPicker={() => onChangeMode?.("month")}
        onSelectYearPicker={() => onChangeMode?.("year")}
      />
      <DayLabel />
      <div className="days-body">
        {days.map(({ id, isNotCurrentMonth, ...date }) => (
          <div
            key={`${id}-${date.month}`}
            className={classNames("day-item-outer")}
          >
            <Day
              day={date.day}
              isDisabled={isNotCurrentMonth}
              onPress={() => onDaychange(date)}
              isHighlight={isEqual(cacheDate, date)}
              isOffDay={isWeekend(date, isJalaali)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export { Days };
