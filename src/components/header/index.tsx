import LeftIcon from "../../assets/icons/chevron_left.svg";
import RightIcon from "../../assets/icons/chevron_right.svg";
import LeftIconDouble from "../../assets/icons/keyboard_double_arrow_left.svg";
import RightIconDouble from "../../assets/icons/keyboard_double_arrow_right.svg";

import { useDatepicker } from "../../core";
import { useGetMonthLabel } from "../../utils/getMonthLabel";
import { usePanelContext } from "../panel/panelMode";

export interface HeaderProps {
  onSelectMonthPicker?: () => void;
  onSelectYearPicker?: () => void;
}

const Header = ({ onSelectMonthPicker, onSelectYearPicker }: HeaderProps) => {
  const {
    cacheDate,
    state,
    onDecreaseYear,
    onDecreaseMonth,
    onIncreaseMonth,
    onIncreaseYear,
    isJalaali,
  } = useDatepicker();

  const selectedDate = state || cacheDate;

  const getMonthLabel = useGetMonthLabel();
  const { headerRender } = usePanelContext();

  const current = selectedDate && selectedDate.day !== 0 ? selectedDate : null;

  const node = (
    <div className="panel-header-rtl">
      <div className="panel-header-inner">
        <div className="center">
          <div
            className="iconItem"
            onClick={() =>
              isJalaali
                ? onDecreaseYear(selectedDate)
                : onIncreaseYear(selectedDate)
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
              isJalaali
                ? onDecreaseMonth(selectedDate)
                : onIncreaseMonth(selectedDate)
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
              {getMonthLabel(selectedDate.month)}
            </p>
          </div>
          <div
            className="panel-date-holder-item clickable"
            onClick={onSelectYearPicker}
          >
            <p className="panel-header-item-text">{selectedDate.year}</p>
          </div>
        </div>
        <div className="center">
          <div
            className="iconItem"
            onClick={() =>
              isJalaali
                ? onIncreaseMonth(selectedDate)
                : onDecreaseMonth(selectedDate)
            }
          >
            <img width={18} height={18} src={LeftIcon} alt="LeftIcon" />
          </div>
          <div
            className="iconItem"
            onClick={() =>
              isJalaali
                ? onIncreaseYear(selectedDate)
                : onDecreaseYear(selectedDate)
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
      {headerRender ? headerRender(current, node) : node}
    </div>
  );
};

export { Header };
