import classNames from "classnames";
import { useDatepicker } from "../../../core";
import { Icon } from "../../icon";
import { usePanelContext } from "../panel/panelMode";

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
  const { isJalaali, state } = useDatepicker();

  const { headerRender } = usePanelContext();

  const current = state && state.day !== 0 ? state : null;

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
            {isJalaali ? (
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
            ) : (
              <div className="panel-header-year-picker">
                <span
                  className="clickable"
                  onClick={() => onYearPress?.(upperDecade)}
                >
                  {upperDecade}
                </span>
                <span>{"-"}</span>
                <span
                  className="clickable"
                  onClick={() => onYearPress?.(lowerDecade)}
                >
                  {lowerDecade}
                </span>
              </div>
            )}
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
      {headerRender ? headerRender(current, node) : node}
    </div>
  );
};

export { YearsHeader };
