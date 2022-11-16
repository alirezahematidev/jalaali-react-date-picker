import { useDatepicker } from "../../core";
import { Header } from "../header";
import classNames from "classnames";
import { usePanelContext } from "../panel/panelMode";
import { useMonths } from "../../core/hooks/date/useMonths";

export interface MonthsProps {}

const Months = () => {
  const { onMonthchange, state, isJalaali } = useDatepicker();
  const { onChangeMode } = usePanelContext();
  const { months } = useMonths();
  return (
    <>
      <Header onSelectYearPicker={() => onChangeMode?.("year")} />
      <div className={isJalaali ? "months-body-rtl" : "months-body-ltr"}>
        {months.map((item) => {
          const isSelected = item.id === state.month;
          const isDisabled = item.isDisabled;
          return (
            <div
              onClick={() => {
                if (!isDisabled) {
                  onMonthchange({ ...state, month: item.id });
                  onChangeMode?.("day");
                }
              }}
              key={item.id}
              className={classNames(
                "month-item",
                !isSelected && !isDisabled && "month-item-hovered",
                isSelected && !isDisabled && "month-item-selected",
                isDisabled && "disabled",
              )}
            >
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export { Months };
