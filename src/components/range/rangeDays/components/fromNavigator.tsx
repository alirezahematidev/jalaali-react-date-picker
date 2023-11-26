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
      <div className={"panel-date-holder-item"}>
        <div className="panel-date-holder-item">
          <span className="range-panel-header-item-text">{monthLabel}</span>
        </div>
        <div
          className="panel-date-holder-item clickable"
          onClick={onSelectYearPicker}
        >
          <span className="range-panel-header-item-text">{yearLabel}</span>
        </div>
        <Icon.Dropdown hoverEffect onClick={onSelectYearPicker} />
      </div>
    );
  }

  if (type === "to") return <div className="panel-empty-holder" />;

  return (
    <div className="center">
      <div className="iconItem" onClick={onDecreaseYear}>
        <Icon.DoubleChevron isJalaali={isJalaali} hoverEffect />
      </div>
      <div className="iconItem" onClick={onDecreaseMonth}>
        <Icon.Chevron isJalaali={isJalaali} hoverEffect />
      </div>
    </div>
  );
};
