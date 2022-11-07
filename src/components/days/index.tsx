import classNames from "classnames";
// import { isEqual } from "lodash-es";
import { useDatepicker } from "../../core/logic/useDatepicker";
import { isWeekend } from "../../utils";
import Day from "../day";

export interface DaysProps {}

const Days = ({}: DaysProps) => {
  const { days, onDaychange, cacheDate } = useDatepicker();

  return (
    <>
      {days.map(({ id, isNotCurrentMonth, ...date }) => (
        <div
          key={`${id}-${date.month}`}
          className={classNames("day-item-outer")}
        >
          <Day
            day={date.day}
            isDisabled={isNotCurrentMonth}
            onPress={() => onDaychange(date)}
            // isHighlight={isEqual(cacheDate, date)}
            isOffDay={isWeekend(date, true)}
          />
        </div>
      ))}
    </>
  );
};

export { Days };
