import RightIconDouble from "../../assets/icons/keyboard_double_arrow_right.svg";
import LeftIconDouble from "../../assets/icons/keyboard_double_arrow_left.svg";
import { useDatepicker } from "../../core/logic/useDatepicker";

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
            style={{ width: 18, height: 18 }}
            onClick={() => (isRtl ? onDecreaseDecade() : onIncreaseDecade())}
          />
        </div>
        <div className="panel-date-holder">
          <div
            className="panel-date-holder-item"
            style={{ direction: isRtl ? "rtl" : "ltr" }}
          >
            {isRtl ? (
              <p
                style={{
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >{`${upperDecade}-${lowerDecade}`}</p>
            ) : (
              <p
                style={{
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >{`${lowerDecade}-${upperDecade}`}</p>
            )}
          </div>
        </div>
        <div className="center">
          <img
            className="iconItem"
            src={LeftIconDouble}
            style={{ width: 18, height: 18 }}
            onClick={() => (isRtl ? onIncreaseDecade() : onDecreaseDecade())}
          />
        </div>
      </div>
    </div>
  );
};

export { YearsHeader };
