import { getMonthLabel } from "../../utils/getMonthLabel";
import RightIconDouble from "../../assets/icons/keyboard_double_arrow_right.svg";
import LeftIconDouble from "../../assets/icons/keyboard_double_arrow_left.svg";
import RightIcon from "../../assets/icons/chevron_right.svg";
import LeftIcon from "../../assets/icons/chevron_left.svg";

import { useDatepicker } from "../../core/logic/useDatepicker";

export interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const {
    state,
    onDecreaseYear,
    onDecreaseMonth,
    onIncreaseMonth,
    onIncreaseYear,
  } = useDatepicker();

  return (
    <div className="panel-header-rtl">
      <div className="panel-header-inner">
        <div className="center">
          <img
            className="iconItem"
            src={RightIconDouble}
            style={{ width: 18, height: 18 }}
            onClick={() => onDecreaseYear(state)}
          />
          <img
            className="iconItem"
            src={RightIcon}
            style={{ width: 18, height: 18 }}
            onClick={() => onDecreaseMonth(state)}
          />
        </div>
        <div className="panel-date-holder">
          <div className="panel-date-holder-item">
            <p style={{ fontSize: 14 }}>{getMonthLabel(state.month, true)}</p>
          </div>
          <div className="panel-date-holder-item">
            <p style={{ fontSize: 14 }}>{state.year}</p>
          </div>
        </div>
        <div className="center">
          <img
            className="iconItem"
            src={LeftIcon}
            style={{ width: 18, height: 18 }}
            onClick={() => onIncreaseMonth(state)}
          />
          <img
            className="iconItem"
            src={LeftIconDouble}
            style={{ width: 18, height: 18 }}
            onClick={() => onIncreaseYear(state)}
          />
        </div>
      </div>
    </div>
  );
};

export { Header };
