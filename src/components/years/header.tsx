import RightIconDouble from "../../assets/icons/keyboard_double_arrow_right.svg";
import LeftIconDouble from "../../assets/icons/keyboard_double_arrow_left.svg";
import { useDatepicker } from "../../core/logic/useDatepicker";
import classNames from "classnames";

export interface HeaderProps {
  lowerDecade: number;
  upperDecade: number;
  onIncreaseDecade: () => void;
  onDecreaseDecade: () => void;
}

const YearsHeader = ({
  lowerDecade,
  upperDecade,
  onDecreaseDecade,
  onIncreaseDecade,
}: HeaderProps) => {
  const { isJalaali: isRtl } = useDatepicker();
  return (
    <div className="panel-header-rtl">
      <div className="panel-header-inner">
        <div className="center">
          <img
            className="iconItem"
            src={RightIconDouble}
            onClick={() => (isRtl ? onDecreaseDecade() : onIncreaseDecade())}
          />
        </div>
        <div className="panel-date-holder">
          <div
            className={classNames(
              "panel-date-holder-item",
              isRtl
                ? "panel-date-holder-item-rtl"
                : "panel-date-holder-item-ltr",
            )}
          >
            {isRtl ? (
              <p className="clickable">{`${upperDecade}-${lowerDecade}`}</p>
            ) : (
              <p className="clickable">{`${lowerDecade}-${upperDecade}`}</p>
            )}
          </div>
        </div>
        <div className="center">
          <img
            className="iconItem"
            src={LeftIconDouble}
            onClick={() => (isRtl ? onIncreaseDecade() : onDecreaseDecade())}
          />
        </div>
      </div>
    </div>
  );
};

export { YearsHeader };
