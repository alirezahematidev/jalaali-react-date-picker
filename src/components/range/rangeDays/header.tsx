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
    rangeDateString,
  } = useRangepicker();

  const { type } = useRangeTemplate();

  const { headerRender } = useRangePanelContext();

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
      />
    </div>
  );

  return (
    <div className="panel-header-wrapper">
      {headerRender ? headerRender(rangeDateString, node) : node}
    </div>
  );
};

export { RangeHeader };
