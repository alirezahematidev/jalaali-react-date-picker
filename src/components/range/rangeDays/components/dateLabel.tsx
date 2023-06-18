import { Icon } from "../../../icon";

interface DateLabelProps {
  onSelectMonthPicker?: () => void;
  onSelectYearPicker?: () => void;
  onIncreaseMonth: () => void;
  onDecreaseMonth: () => void;
  monthLabel?: string;
  yearLabel?: string;
  shouldResponsive?: boolean;
  isJalaali: boolean;
}

export const DateLabel = ({
  monthLabel,
  onSelectMonthPicker,
  onSelectYearPicker,
  yearLabel,
  onDecreaseMonth,
  onIncreaseMonth,
  shouldResponsive,
  isJalaali,
}: DateLabelProps) => {
  if (shouldResponsive) {
    return (
      <div className="stretch">
        <div onClick={onDecreaseMonth}>
          <Icon.Chevron isJalaali={isJalaali} hoverEffect />
        </div>
        <div onClick={onIncreaseMonth}>
          <Icon.Chevron isJalaali={!isJalaali} hoverEffect />
        </div>
      </div>
    );
  }

  return (
    <div className="panel-date-holder-item-ltr">
      <div
        className="panel-date-holder-item clickable"
        onClick={onSelectMonthPicker}
      >
        <span className="panel-header-item-text">{monthLabel}</span>
      </div>
      <div
        className="panel-date-holder-item clickable"
        onClick={onSelectYearPicker}
      >
        <span className="panel-header-item-text">{yearLabel}</span>
      </div>
    </div>
  );
};
