import { useRangepicker } from "../../../core";
import { getMonthLabels } from "../../../utils";
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
  } = useRangepicker();

  const { type } = useRangeTemplate();

  //   const startDate = selectedDate && selectedDate.day !== 0 ? selectedDate : null;

  const node = (
    <div className="panel-header-rtl">
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

  return <div className="panel-header-wrapper">{node}</div>;
};

export { RangeHeader };
