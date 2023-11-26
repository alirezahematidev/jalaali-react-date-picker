import classNames from "classnames";
import { useDatepicker, useMonths } from "../../../core";
import { Header } from "../header";
import { usePanelContext } from "../panel/panelMode";

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
              onMouseUp={(e) => {
                if (!isDisabled) {
                  onMonthchange({ ...state, month: item.id });
                  onChangeMode?.("day");
                }
              }}
              onTouchEnd={(e) => {
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
              <span className="month-item-name">{item.name}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Months;
