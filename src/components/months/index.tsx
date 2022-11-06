import classNames from "classnames";
import { gregorianMonths, jalaaliMonths } from "../../core";
import { useDatepicker } from "../../core/logic/useDatepicker";
import { Header } from "../header";

export interface MonthsProps {
  onSelectMonth?: () => void;
  onChangeMode?: (mode: "year") => void;
}

const Months = ({ onSelectMonth, onChangeMode }: MonthsProps) => {
  const { isJalaali, onMonthchange, state } = useDatepicker();
  const months = isJalaali ? jalaaliMonths : gregorianMonths;
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
                onSelectMonth?.();
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
