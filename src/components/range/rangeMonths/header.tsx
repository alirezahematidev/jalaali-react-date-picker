import classNames from "classnames";
import { useRangepicker } from "../../../core";
import { getMonthLabels } from "../../../utils";
import { useRangeTemplate } from "../rangePanel/templateContext";

export interface HeaderProps {}

const MonthsHeader = ({}: HeaderProps) => {
  const { isJalaali } = useRangepicker();
  const { onChangeMode, type } = useRangeTemplate();
  const { from, to } = useRangepicker();
  const { year, month } = type === "from" ? from : to;

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
              <span
                className="clickable"
                onClick={() => onChangeMode?.("year")}
              >
                {year}
              </span>
              <span>{"-"}</span>
              <span className="clickable">
                {getMonthLabels(month, isJalaali)}
              </span>
            </div>
          </div>
        </div>
        <div className="center"></div>
      </div>
    </div>
  );

  return (
    <div className="panel-header-wrapper">
      {node}
      {/* {headerRender ? headerRender(current, node) : node} */}
    </div>
  );
};

export { MonthsHeader };
