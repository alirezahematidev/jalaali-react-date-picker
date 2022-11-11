import RightIconDouble from "../../assets/icons/keyboard_double_arrow_right.svg";
import LeftIconDouble from "../../assets/icons/keyboard_double_arrow_left.svg";
import RightIcon from "../../assets/icons/chevron_right.svg";
import LeftIcon from "../../assets/icons/chevron_left.svg";

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
  isCurrent?: boolean;
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
  isCurrent,
}: HeaderSideProps) => {
  return (
    <div className="panel-header-inner">
      {isCurrent ? (
        <div className="center">
          <div
            className="iconItem"
            onClick={() => (isJalaali ? onDecreaseYear() : onIncreaseYear())}
          >
            <img
              width={18}
              height={18}
              src={RightIconDouble}
              alt="RightIconDouble"
            />
          </div>
          <div
            className="iconItem"
            onClick={() => (isJalaali ? onDecreaseMonth() : onIncreaseMonth())}
          >
            <img width={18} height={18} src={RightIcon} alt="RightIcon" />
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
      {!isCurrent ? (
        <div className="center">
          <div
            className="iconItem"
            onClick={() => (isJalaali ? onIncreaseMonth() : onDecreaseMonth())}
          >
            <img width={18} height={18} src={LeftIcon} alt="LeftIcon" />
          </div>
          <div
            className="iconItem"
            onClick={() => (isJalaali ? onIncreaseYear() : onDecreaseYear())}
          >
            <img
              width={18}
              height={18}
              alt="LeftIconDouble"
              src={LeftIconDouble}
            />
          </div>
        </div>
      ) : (
        <div className="panel-empty-holder" />
      )}
    </div>
  );
};

export { HeaderSide };
