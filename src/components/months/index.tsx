import { useDatepicker } from "../../core";
import { Header } from "../header";
import classNames from "classnames";
import { usePanelContext } from "../panel/panelMode";

export interface MonthsProps {}

const Months = () => {
  const { onMonthchange, state, isJalaali, months } = useDatepicker();
  const { onChangeMode } = usePanelContext();

  return (
    <>
      <Header onSelectYearPicker={() => onChangeMode?.("year")} />
      <div className={isJalaali ? "months-body-rtl" : "months-body-ltr"}>
        {months.map((item) => {
          const isSelected = item.id === state.month;
          return (
            <p
              key={item.id}
              onClick={() => {
                onMonthchange({ ...state, month: item.id });
                onChangeMode?.("day");
              }}
              className={classNames(
                "month-item",
                isSelected && "month-item-selected",
              )}
            >
              {item.name}
            </p>
          );
        })}
      </div>
    </>
  );
};

export { Months };
