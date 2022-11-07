import RightIconDouble from "../../assets/icons/keyboard_double_arrow_right.svg";
import LeftIconDouble from "../../assets/icons/keyboard_double_arrow_left.svg";
import RightIcon from "../../assets/icons/chevron_right.svg";
import LeftIcon from "../../assets/icons/chevron_left.svg";

import { useGetMonthLabel } from "../../utils/getMonthLabel";
import { useDatepicker } from "../../core";
import { usePanelContext } from "../panel/panelMode";

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
  const { renderHeader } = usePanelContext();

  const current = state && state.day !== 0 ? state : null;

  const node = (
    <div className="panel-header-rtl">
      <div className="panel-header-inner">
        <div className="center">
          <div
            className="iconItem"
            onClick={() =>
              isJalaali ? onDecreaseYear(state) : onIncreaseYear(state)
            }
          >
            <img
              width={18}
              height={18}
              src={RightIconDouble}
              alt="RightIconDouble"
            />
          </div>
          <div
            className="iconItem"
            onClick={() =>
              isJalaali ? onDecreaseMonth(state) : onIncreaseMonth(state)
            }
          >
            <img width={18} height={18} src={RightIcon} alt="RightIcon" />
          </div>
        </div>
        <div className="panel-date-holder-item-ltr">
          <div
            className="panel-date-holder-item clickable"
            onClick={onSelectMonthPicker}
          >
            <p className="panel-header-item-text">
              {getMonthLabel(state.month)}
            </p>
          </div>
          <div
            className="panel-date-holder-item clickable"
            onClick={onSelectYearPicker}
          >
            <p className="panel-header-item-text">{state.year}</p>
          </div>
        </div>
        <div className="center">
          <div
            className="iconItem"
            onClick={() =>
              isJalaali ? onIncreaseMonth(state) : onDecreaseMonth(state)
            }
          >
            <img width={18} height={18} src={LeftIcon} alt="LeftIcon" />
          </div>
          <div
            className="iconItem"
            onClick={() =>
              isJalaali ? onIncreaseYear(state) : onDecreaseYear(state)
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

export { Header };
