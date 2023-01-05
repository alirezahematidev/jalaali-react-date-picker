import classNames from "classnames";
import { useRangepicker } from "../../../core";
import { getMonthLabels } from "../../../utils";
import { useRangePanelContext } from "../rangePanel/panelRangeMode";
import { useRangeTemplate } from "../rangePanel/templateContext";
import { HeaderSide } from "./side";

export interface HeaderProps {
  onSelectMonthPicker?: () => void;
  onSelectYearPicker?: () => void;
}

const RangeHeader = ({
  onSelectMonthPicker,
  onSelectYearPicker,
}: HeaderProps) => {
  const {
    onRangeDecreaseYear,
    onRangeDecreaseMonth,
    onRangeIncreaseMonth,
    onRangeIncreaseYear,
    isJalaali,
    from,
    to,
    dateRange,
  } = useRangepicker();

  const { type } = useRangeTemplate();

  const { headerRender, shouldResponsive } = useRangePanelContext();

  const node = (
    <div className={isJalaali ? "panel-header-rtl" : "panel-header-ltr"}>
      <HeaderSide
        isJalaali={isJalaali}
        yearLabel={String(type === "from" ? from.year : to.year)}
        monthLabel={getMonthLabels(
          type === "from" ? from.month : to.month || 0,
          isJalaali,
        )}
        onDecreaseMonth={() => onRangeDecreaseMonth()}
        onDecreaseYear={() => onRangeDecreaseYear()}
        onIncreaseMonth={() => onRangeIncreaseMonth()}
        onIncreaseYear={() => onRangeIncreaseYear()}
        onSelectMonthPicker={onSelectMonthPicker}
        onSelectYearPicker={onSelectYearPicker}
        shouldResponsive={shouldResponsive}
      />
    </div>
  );

  return (
    <div
      className={classNames(
        shouldResponsive
          ? "mobile-panel-header-wrapper"
          : "panel-header-wrapper",
      )}
    >
      {headerRender ? headerRender(dateRange, node) : node}
    </div>
  );
};

export { RangeHeader };
