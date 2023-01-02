import classNames from "classnames";
import { useState } from "react";
import { useDatepicker, useYears } from "../../../core";
import { usePanelContext } from "../panel/panelMode";
import { YearsHeader } from "./header";

const Years = () => {
  const { isJalaali, onYearchange, state } = useDatepicker();
  const { onChangeMode } = usePanelContext();
  const [offset, setoffset] = useState(0);
  const { years, lowerDecade, upperDecade } = useYears(offset);
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
          const isDisabled = item.isDisabled;
          return (
            <div
              key={item.id}
              onClick={() => {
                if (!isDisabled) {
                  onYearchange({ ...state, year: item.id });
                  onChangeMode?.("month");
                }
              }}
              className={classNames(
                "year-item",
                !isSelected && !isDisabled && "year-item-hovered",
                isSelected && !isDisabled && "year-item-selected",
                isNotCurrentDecade && "year-item-prev",
                isDisabled && "disabled",
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
