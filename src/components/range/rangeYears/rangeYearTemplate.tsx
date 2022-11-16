import classNames from "classnames";
import { DateRangePickerTypes, useRangepicker } from "../../../core";
import { Year } from "../../../core/types/global.types";
import { useRangeTemplate } from "../rangePanel/templateContext";
import { YearsHeader } from "./header";

interface RangeYearTemplatePanelProps {
  onChangeMode?: (mode: DateRangePickerTypes.Mode) => void;
  years: Year[];
  lowerDecade: number;
  upperDecade: number;
  onSelect: (year: number) => void;
  onDecreaseDecade: () => void;
  onIncreaseDecade: () => void;
}

export const RangeYeartemplate = ({
  years,
  onChangeMode,
  lowerDecade,
  upperDecade,
  onSelect,
  onDecreaseDecade,
  onIncreaseDecade,
}: RangeYearTemplatePanelProps) => {
  const { isJalaali, from, to } = useRangepicker();
  const { type } = useRangeTemplate();
  const year = type === "from" ? from.year : to.year;

  return (
    <>
      <YearsHeader
        lowerDecade={lowerDecade}
        upperDecade={upperDecade}
        onDecreaseDecade={onDecreaseDecade}
        onIncreaseDecade={onIncreaseDecade}
        onYearPress={(year) => {
          onSelect(year);
          onChangeMode?.("month");
        }}
      />
      <div className={isJalaali ? "years-body-rtl" : "years-body-ltr"}>
        {years.map((item) => {
          const isSelected = item.id === year;
          const isNotCurrentDecade = item.isNotCurrentDecade;
          const isDisabled =
            item.isDisabled || type === "to" ? item.id < from.year : false;
          return (
            <div
              key={item.id}
              onClick={() => {
                if (!isDisabled) {
                  onSelect(item.id);
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
