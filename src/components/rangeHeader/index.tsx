import { useGetMonthLabel } from "../../utils/getMonthLabel";
import { useRangepicker } from "../../core";
import { usePanelContext } from "../panel/panelMode";
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
    rangeState,
    onRangeDecreaseYear,
    onRangeDecreaseMonth,
    onRangeIncreaseMonth,
    onRangeIncreaseYear,
    isJalaali,
  } = useRangepicker();

  const getMonthLabel = useGetMonthLabel();
  const { headerRender } = usePanelContext();

  //   const current = selectedDate && selectedDate.day !== 0 ? selectedDate : null;

  const node = (
    <div className="panel-header-rtl">
      <HeaderSide
        isJalaali={isJalaali}
        yearLabel={String(rangeState.current.year)}
        monthLabel={getMonthLabel(rangeState.current.month)}
        onDecreaseMonth={() => onRangeDecreaseMonth(rangeState)}
        onDecreaseYear={() => onRangeDecreaseYear(rangeState)}
        onIncreaseMonth={() => onRangeIncreaseMonth(rangeState)}
        onIncreaseYear={() => onRangeIncreaseYear(rangeState)}
        onSelectMonthPicker={onSelectMonthPicker}
        onSelectYearPicker={onSelectYearPicker}
        isCurrent
      />
      <HeaderSide
        isJalaali={isJalaali}
        yearLabel={String(rangeState.next?.year)}
        monthLabel={getMonthLabel(rangeState.next?.month || 0)}
        onDecreaseMonth={() => onRangeDecreaseMonth(rangeState)}
        onDecreaseYear={() => onRangeDecreaseYear(rangeState)}
        onIncreaseMonth={() => onRangeIncreaseMonth(rangeState)}
        onIncreaseYear={() => onRangeIncreaseYear(rangeState)}
        onSelectMonthPicker={onSelectMonthPicker}
        onSelectYearPicker={onSelectYearPicker}
      />
    </div>
  );

  return <div className="panel-header-wrapper">{node}</div>;
};

export { RangeHeader };
