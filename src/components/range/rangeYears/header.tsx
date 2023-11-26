import classNames from "classnames";
import { useRangepicker } from "../../../core";
import { Icon } from "../../icon";
import { useRangePanelContext } from "../rangePanel/panelRangeMode";

export interface HeaderProps {
  lowerDecade: number;
  upperDecade: number;
  onIncreaseDecade: () => void;
  onDecreaseDecade: () => void;
  onYearPress?: (id: number) => void;
}

const YearsHeader = ({
  lowerDecade,
  upperDecade,
  onDecreaseDecade,
  onIncreaseDecade,
  onYearPress,
}: HeaderProps) => {
  const { isJalaali, rangeStateMoment } = useRangepicker();

  const { headerRender } = useRangePanelContext();

  const node = (
    <div className="panel-header-rtl">
      <div className="panel-header-inner">
        <div className="center">
          <div
            className="iconItem"
            onClick={() =>
              isJalaali ? onDecreaseDecade() : onIncreaseDecade()
            }
          >
            <Icon.DoubleChevronRight hoverEffect />
          </div>
        </div>
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
                onClick={() => onYearPress?.(lowerDecade)}
              >
                {lowerDecade}
              </span>
              <span>{"-"}</span>
              <span
                className="clickable"
                onClick={() => onYearPress?.(upperDecade)}
              >
                {upperDecade}
              </span>
            </div>
          </div>
        </div>
        <div className="center">
          <div
            className="iconItem"
            onClick={() =>
              isJalaali ? onIncreaseDecade() : onDecreaseDecade()
            }
          >
            <Icon.DoubleChevronLeft hoverEffect />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="panel-header-wrapper">
      {headerRender ? headerRender(rangeStateMoment, node) : node}
    </div>
  );
};

export { YearsHeader };
