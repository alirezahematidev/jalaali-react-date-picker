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
}: // onSelectMonthPicker,
// onSelectYearPicker,
FromNavigatorProps) => {
  if (shouldResponsive) {
    return (
      <div className={classNames("panel-date-holder-item-ltr")}>
        <div
          className="panel-date-holder-item" //panel-date-holder-item clickable
          // onClick={onSelectYearPicker}
        >
          <p className="panel-header-item-text">{yearLabel}</p>
        </div>
        <div
          className="panel-date-holder-item" //panel-date-holder-item clickable
          // onClick={onSelectMonthPicker}
        >
          <p className="panel-header-item-text">{monthLabel}</p>
        </div>
      </div>
    );
  }

  if (type === "to") return <div className="panel-empty-holder" />;

  return (
    <div className="center">
      <div onClick={onDecreaseYear}>
        <Icon.DoubleChevron isJalaali={isJalaali} hoverEffect />
      </div>
      <div onClick={onDecreaseMonth}>
        <Icon.Chevron isJalaali={isJalaali} hoverEffect />
      </div>
    </div>
  );
};
