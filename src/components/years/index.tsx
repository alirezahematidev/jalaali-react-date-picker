import { useState } from "react";
import { listOfYears } from "../../utils";
import classNames from "classnames";
import { YearsHeader } from "./header";
import { useDatepicker } from "../../core";

export interface MonthsProps {
  onSelectYear?: () => void;
}

const Years = ({ onSelectYear }: MonthsProps) => {
  const { isJalaali, onYearchange, state } = useDatepicker();
  const [offset, setoffset] = useState(0);
  const { years, lowerDecade, upperDecade } = listOfYears(isJalaali, offset);

  return (
    <>
      <YearsHeader
        {...{ lowerDecade, upperDecade }}
        onDecreaseDecade={() => setoffset((prev) => prev - 10)}
        onIncreaseDecade={() => setoffset((prev) => prev + 10)}
      />
      <div className={isJalaali ? "years-body-rtl" : "years-body-ltr"}>
        {years.map((item) => {
          const isSelected = item.id === state.year;
          const isNotCurrentDecade = item.isNotCurrentDecade;
          return (
            <p
              key={item.id}
              onClick={() => {
                onYearchange({ ...state, year: item.id });
                onSelectYear?.();
              }}
              className={classNames(
                "year-item",
                isSelected && "year-item-selected",
                isNotCurrentDecade && "year-item-prev",
              )}
            >
              {item.id}
            </p>
          );
        })}
      </div>
    </>
  );
};

export { Years };
