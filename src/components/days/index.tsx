import classNames from "classnames";
import { useDatepicker } from "../../core/logic/useDatepicker";
import Day from "../day";

export interface DaysProps {}

const Days = ({}: DaysProps) => {
  const { days, onDaychange, state, cacheDate } = useDatepicker();

  return (
    <>
      {days.map(({ day, id, monthId, isNotCurrentMonth, year }) => (
        <div key={`${id}-${monthId}`} className={classNames("day-item-outer")}>
          <Day
            day={day}
            isDisabled={isNotCurrentMonth}
            onPress={() =>
              onDaychange({
                day,
                month: monthId,
                year: state.year,
              })
            }
            isHighlight={
              day === cacheDate?.day &&
              cacheDate?.month === monthId &&
              cacheDate?.year === year
            }
          />
        </div>
      ))}
    </>
  );
};

export { Days };
