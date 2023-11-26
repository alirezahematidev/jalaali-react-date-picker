import classNames from "classnames";
import { Mode, Month, useRangepicker } from "../../../core";
import { useRangeTemplate } from "../rangePanel/templateContext";
import { MonthsHeader } from "./header";

interface RangeMonthTemplatePanelProps {
  onChangeMode?: (mode: Mode) => void;
  months: Month[];
  onSelect: (month: number) => void;
}

export const RangeMonthtemplate = ({
  months,
  onSelect,
}: RangeMonthTemplatePanelProps) => {
  const { isJalaali, from, to } = useRangepicker();
  const { type, onChangeMode } = useRangeTemplate();

  const month = type === "from" ? from.month : to.month;
  return (
    <>
      <MonthsHeader />
      <div className={isJalaali ? "months-body-rtl" : "months-body-ltr"}>
        {months.map((item) => {
          const isSelected = item.id === month;
          const isDisabled = item.isDisabled;
          return (
            <div
              key={item.id}
              onClick={() => {
                if (!isDisabled) {
                  onSelect(item.id);
                  onChangeMode?.("day");
                }
              }}
              className={classNames(
                "month-item",
                !isSelected && !isDisabled && "month-item-hovered",
                isSelected && !isDisabled && "month-item-selected",
                isDisabled && "disabled",
              )}
            >
              <span className="month-item-name">{item.name}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};
