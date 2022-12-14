import { Icon } from "../../icon";
import { useRangeTemplate } from "../rangePanel/templateContext";

interface HeaderSideProps {
  isJalaali: boolean;
  onDecreaseYear: () => void;
  onIncreaseYear: () => void;
  onDecreaseMonth: () => void;
  onIncreaseMonth: () => void;
  onSelectMonthPicker?: () => void;
  onSelectYearPicker?: () => void;
  monthLabel?: string;
  yearLabel?: string;
}

const HeaderSide = ({
  isJalaali,
  onDecreaseYear,
  onIncreaseYear,
  onDecreaseMonth,
  onIncreaseMonth,
  onSelectMonthPicker,
  onSelectYearPicker,
  monthLabel,
  yearLabel,
}: HeaderSideProps) => {
  const { type } = useRangeTemplate();
  return (
    <div className="panel-header-inner">
      {type === "from" ? (
        <div className="center">
          <div onClick={onDecreaseYear}>
            {isJalaali ? (
              <Icon.DoubleChevronRight />
            ) : (
              <Icon.DoubleChevronLeft />
            )}
          </div>
          <div onClick={onDecreaseMonth}>
            {isJalaali ? <Icon.ChevronRight /> : <Icon.ChevronLeft />}
          </div>
        </div>
      ) : (
        <div className="panel-empty-holder" />
      )}
      <div className="panel-date-holder-item-ltr">
        <div
          className="panel-date-holder-item clickable"
          onClick={onSelectMonthPicker}
        >
          <p className="panel-header-item-text">{monthLabel}</p>
        </div>
        <div
          className="panel-date-holder-item clickable"
          onClick={onSelectYearPicker}
        >
          <p className="panel-header-item-text">{yearLabel}</p>
        </div>
      </div>
      {type === "to" ? (
        <div className="center">
          <div onClick={onIncreaseMonth}>
            {isJalaali ? <Icon.ChevronLeft /> : <Icon.ChevronRight />}
          </div>
          <div onClick={onIncreaseYear}>
            {isJalaali ? (
              <Icon.DoubleChevronLeft />
            ) : (
              <Icon.DoubleChevronRight />
            )}
          </div>
        </div>
      ) : (
        <div className="panel-empty-holder" />
      )}
    </div>
  );
};

export { HeaderSide };
