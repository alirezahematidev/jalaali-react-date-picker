import { useState } from "react";
import { listOfYears } from "../../utils";
import classNames from "classnames";
import { YearsHeader } from "./header";
import { useDatepicker } from "../../core";
import { usePanelContext } from "../panel/panelMode";

export interface MonthsProps {}

const Years = () => {
  const { isJalaali, onYearchange, state } = useDatepicker();
  const { onChangeMode } = usePanelContext();
  const [offset, setoffset] = useState(0);
  const { years, lowerDecade, upperDecade } = listOfYears(isJalaali, offset);

  return (
    <>
      <YearsHeader
        {...{ lowerDecade, upperDecade }}
        onDecreaseDecade={() => setoffset((prev) => prev - 10)}
        onIncreaseDecade={() => setoffset((prev) => prev + 10)}
        onYearPress={(year) => {
          onYearchange({ ...state, year });
          onChangeMode?.("month");
        }}
      />
      <div className={isJalaali ? "years-body-rtl" : "years-body-ltr"}>
        {years.map((item) => {
          const isSelected = item.id === state.year;
          const isNotCurrentDecade = item.isNotCurrentDecade;
          return (
            <div
              key={item.id}
              onClick={() => {
                onYearchange({ ...state, year: item.id });
                onChangeMode?.("month");
              }}
              className={classNames(
                "year-item",
                !isSelected && "year-item-hovered",
                isSelected && "year-item-selected",
                isNotCurrentDecade && "year-item-prev",
              )}
            >
              <p>{item.id}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export { Years };
