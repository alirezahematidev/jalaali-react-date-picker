import LeftIcon from "../../../assets/icons/chevron_left.svg";
import RightIcon from "../../../assets/icons/chevron_right.svg";
import LeftIconDouble from "../../../assets/icons/keyboard_double_arrow_left.svg";
import RightIconDouble from "../../../assets/icons/keyboard_double_arrow_right.svg";
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
          <div className="iconItem" onClick={onDecreaseYear}>
            <img
              width={18}
              height={18}
              src={isJalaali ? RightIconDouble : LeftIconDouble}
              alt="RightIconDouble"
            />
          </div>
          <div className="iconItem" onClick={onDecreaseMonth}>
            <img
              width={18}
              height={18}
              src={isJalaali ? RightIcon : LeftIcon}
              alt="RightIcon"
            />
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
          <div className="iconItem" onClick={onIncreaseMonth}>
            <img
              width={18}
              height={18}
              src={isJalaali ? LeftIcon : RightIcon}
              alt="LeftIcon"
            />
          </div>
          <div className="iconItem" onClick={onIncreaseYear}>
            <img
              width={18}
              height={18}
              alt="LeftIconDouble"
              src={isJalaali ? LeftIconDouble : RightIconDouble}
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
