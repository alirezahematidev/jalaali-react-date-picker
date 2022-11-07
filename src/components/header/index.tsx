import RightIconDouble from "../../assets/icons/keyboard_double_arrow_right.svg";
import LeftIconDouble from "../../assets/icons/keyboard_double_arrow_left.svg";
import RightIcon from "../../assets/icons/chevron_right.svg";
import LeftIcon from "../../assets/icons/chevron_left.svg";

import { useGetMonthLabel } from "../../utils/getMonthLabel";
import { useDatepicker } from "../../core";

export interface HeaderProps {
  onSelectMonthPicker?: () => void;
  onSelectYearPicker?: () => void;
}

const Header = ({ onSelectMonthPicker, onSelectYearPicker }: HeaderProps) => {
  const {
    state,
    onDecreaseYear,
    onDecreaseMonth,
    onIncreaseMonth,
    onIncreaseYear,
    isJalaali,
  } = useDatepicker();

  const getMonthLabel = useGetMonthLabel();

  return (
    <div className="panel-header-rtl">
      <div className="panel-header-inner">
        <div className="center">
          <img
            className="iconItem"
            src={RightIconDouble}
            onClick={() =>
              isJalaali ? onDecreaseYear(state) : onIncreaseMonth(state)
            }
          />
          <img
            className="iconItem"
            src={RightIcon}
            onClick={() =>
              isJalaali ? onDecreaseMonth(state) : onIncreaseMonth(state)
            }
          />
        </div>
        <div className="panel-date-holder">
          <div
            className="panel-date-holder-item clickable"
            onClick={onSelectMonthPicker}
          >
            <p>{getMonthLabel(state.month)}</p>
          </div>
          <div
            className="panel-date-holder-item clickable"
            onClick={onSelectYearPicker}
          >
            <p>{state.year}</p>
          </div>
        </div>
        <div className="center">
          <img
            className="iconItem"
            src={LeftIcon}
            onClick={() =>
              isJalaali ? onIncreaseMonth(state) : onDecreaseMonth(state)
            }
          />
          <img
            className="iconItem"
            src={LeftIconDouble}
            onClick={() =>
              isJalaali ? onIncreaseYear(state) : onDecreaseMonth(state)
            }
          />
        </div>
      </div>
    </div>
  );
};

export { Header };
