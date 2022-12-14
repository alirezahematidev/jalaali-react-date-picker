import { useDatepicker } from "../../../core";
import { getMonthLabels } from "../../../utils";
import { Icon } from "../../icon";
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

  const { headerRender, navigationIcons } = usePanelContext();

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
            {navigationIcons?.superPrevIcon || <Icon.DoubleChevronRight />}
          </div>
          <div
            className="iconItem"
            onClick={() =>
              isJalaali
                ? onDecreaseMonth(selectedDate)
                : onIncreaseMonth(selectedDate)
            }
          >
            {navigationIcons?.prevIcon || <Icon.ChevronRight />}
          </div>
        </div>
        <div className="panel-date-holder-item-ltr">
          <div
            className="panel-date-holder-item clickable"
            onClick={onSelectMonthPicker}
          >
            <p className="panel-header-item-text">
              {getMonthLabels(selectedDate.month, isJalaali)}
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
            {navigationIcons?.nextIcon || <Icon.ChevronLeft />}
          </div>
          <div
            className="iconItem"
            onClick={() =>
              isJalaali
                ? onIncreaseYear(selectedDate)
                : onDecreaseYear(selectedDate)
            }
          >
            {navigationIcons?.superNextIcon || <Icon.DoubleChevronLeft />}
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
