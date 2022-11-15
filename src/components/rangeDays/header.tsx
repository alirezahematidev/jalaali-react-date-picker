import { useGetMonthLabel } from "../../utils/getMonthLabel";
import { useRangepicker } from "../../core";
import { HeaderSide } from "./side";
import { useRangeTemplate } from "../rangePanel/templateContext";

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

  const getMonthLabel = useGetMonthLabel();

  //   const startDate = selectedDate && selectedDate.day !== 0 ? selectedDate : null;

  const node = (
    <div className="panel-header-rtl">
      <HeaderSide
        isJalaali={isJalaali}
        yearLabel={String(type === "from" ? from.year : to.year)}
        monthLabel={getMonthLabel(type === "from" ? from.month : to.month || 0)}
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
