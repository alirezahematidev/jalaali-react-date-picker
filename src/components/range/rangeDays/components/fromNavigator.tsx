import classNames from "classnames";
import { Icon } from "../../../icon";

interface FromNavigatorProps {
  onDecreaseYear: () => void;
  onDecreaseMonth: () => void;
  isJalaali: boolean;
  shouldResponsive?: boolean;
  type: "from" | "to";
  monthLabel?: string;
  yearLabel?: string;
  onSelectMonthPicker?: () => void;
  onSelectYearPicker?: () => void;
}

export const FromNavigator = ({
  isJalaali,
  onDecreaseMonth,
  onDecreaseYear,
  type,
  shouldResponsive,
  monthLabel,
  yearLabel,
  onSelectYearPicker,
}: FromNavigatorProps) => {
  if (shouldResponsive) {
    return (
      <div className={classNames("panel-date-holder-item")}>
        <div className="panel-date-holder-item">
          <span className="range-panel-header-item-text">{monthLabel}</span>
        </div>
        <div
          className="panel-date-holder-item clickable"
          onClick={onSelectYearPicker}
          onTouchStart={onSelectYearPicker}
        >
          <span className="range-panel-header-item-text">{yearLabel}</span>
        </div>
        <Icon.Dropdown hoverEffect />
      </div>
    );
  }

  if (type === "to") return <div className="panel-empty-holder" />;

  return (
    <div className="center">
      <div onClick={onDecreaseYear} onTouchStart={onDecreaseYear}>
        <Icon.DoubleChevron isJalaali={isJalaali} hoverEffect />
      </div>
      <div onClick={onDecreaseMonth} onTouchStart={onDecreaseMonth}>
        <Icon.Chevron isJalaali={isJalaali} hoverEffect />
      </div>
    </div>
  );
};
