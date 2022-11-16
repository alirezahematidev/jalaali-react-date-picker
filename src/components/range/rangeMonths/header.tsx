import classNames from "classnames";
import { useDatepicker, useRangepicker } from "../../../core";
import { useGetMonthLabel } from "../../../utils";
import { usePanelContext } from "../../panel/panelMode";
import { useRangeTemplate } from "../rangePanel/templateContext";

export interface HeaderProps {}

const MonthsHeader = ({}: HeaderProps) => {
  const { isJalaali, state } = useDatepicker();
  const { onChangeMode, type } = useRangeTemplate();
  const { from, to } = useRangepicker();
  const { year, month } = type === "from" ? from : to;
  const getMonthLabels = useGetMonthLabel();

  const { headerRender } = usePanelContext();

  const current = state && state.day !== 0 ? state : null;

  const node = (
    <div className="panel-header-rtl">
      <div className="panel-header-inner">
        <div className="center"></div>
        <div className="panel-date-holder">
          <div
            className={classNames(
              "panel-date-holder-item",
              isJalaali
                ? "panel-date-holder-item-rtl"
                : "panel-date-holder-item-ltr",
            )}
          >
            <div className="panel-header-year-picker">
              <p className="clickable" onClick={() => onChangeMode?.("year")}>
                {year}
              </p>
              <span>{"-"}</span>
              <p className="clickable">{getMonthLabels(month)}</p>
            </div>
          </div>
        </div>
        <div className="center"></div>
      </div>
    </div>
  );

  return (
    <div className="panel-header-wrapper">
      {headerRender ? headerRender(current, node) : node}
    </div>
  );
};

export { MonthsHeader };
