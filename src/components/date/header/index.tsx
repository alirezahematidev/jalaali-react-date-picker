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
            onClick={(e) => {
              isJalaali
                ? onDecreaseYear(selectedDate)
                : onIncreaseYear(selectedDate);
            }}
          >
            {navigationIcons?.superPrevIcon || (
              <Icon.DoubleChevronRight hoverEffect />
            )}
          </div>
          <div
            className="iconItem"
            onClick={() =>
              isJalaali
                ? onDecreaseMonth(selectedDate)
                : onIncreaseMonth(selectedDate)
            }
          >
            {navigationIcons?.prevIcon || <Icon.ChevronRight hoverEffect />}
          </div>
        </div>
        <div className="panel-date-holder-item-ltr">
          <div
            className="panel-date-holder-item clickable"
            onClick={onSelectMonthPicker}
          >
            <span className="panel-header-item-text">
              {getMonthLabels(selectedDate.month, isJalaali)}
            </span>
          </div>
          <div
            className="panel-date-holder-item clickable"
            onClick={onSelectYearPicker}
          >
            <span className="panel-header-item-text">{selectedDate.year}</span>
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
            {navigationIcons?.nextIcon || <Icon.ChevronLeft hoverEffect />}
          </div>
          <div
            className="iconItem"
            onClick={() =>
              isJalaali
                ? onIncreaseYear(selectedDate)
                : onDecreaseYear(selectedDate)
            }
          >
            {navigationIcons?.superNextIcon || (
              <Icon.DoubleChevronLeft hoverEffect />
            )}
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
