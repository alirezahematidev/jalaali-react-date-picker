import RightIconDouble from "../../assets/icons/keyboard_double_arrow_right.svg";
import LeftIconDouble from "../../assets/icons/keyboard_double_arrow_left.svg";
import classNames from "classnames";
import { useDatepicker } from "../../core";
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

  const { renderHeader } = usePanelContext();

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
            <img
              width={18}
              height={18}
              alt="RightIconDouble"
              src={RightIconDouble}
            />
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
                <p
                  className="clickable"
                  onClick={() => onYearPress?.(lowerDecade)}
                >
                  {lowerDecade}
                </p>
                <span>{"-"}</span>
                <p
                  className="clickable"
                  onClick={() => onYearPress?.(upperDecade)}
                >
                  {upperDecade}
                </p>
              </div>
            ) : (
              <div className="panel-header-year-picker">
                <p
                  className="clickable"
                  onClick={() => onYearPress?.(upperDecade)}
                >
                  {upperDecade}
                </p>
                <span>{"-"}</span>
                <p
                  className="clickable"
                  onClick={() => onYearPress?.(lowerDecade)}
                >
                  {lowerDecade}
                </p>
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
            <img
              width={18}
              height={18}
              alt="LeftIconDouble"
              src={LeftIconDouble}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="panel-header-wrapper">
      {renderHeader ? renderHeader(current, node) : node}
    </div>
  );
};

export { YearsHeader };
