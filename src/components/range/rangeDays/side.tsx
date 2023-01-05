import { Fragment } from "react";
import { useRangeTemplate } from "../rangePanel/templateContext";
import { DateLabel } from "./components/dateLabel";
import { FromNavigator } from "./components/fromNavigator";
import { SelectedDates } from "./components/selectedDates";
import { ToNavigator } from "./components/toNavigator";

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
  shouldResponsive?: boolean;
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
  shouldResponsive,
}: HeaderSideProps) => {
  const { type } = useRangeTemplate();

  return (
    <Fragment>
      {shouldResponsive && (
        <div className="mobile-extra-date-header">
          <SelectedDates isJalaali={isJalaali} />
        </div>
      )}
      <div className="panel-header-inner">
        <FromNavigator
          {...{
            onDecreaseYear,
            onDecreaseMonth,
            isJalaali,
            shouldResponsive,
            type,
            monthLabel,
            yearLabel,
            onSelectMonthPicker,
            onSelectYearPicker,
          }}
        />
        <DateLabel
          {...{
            onSelectMonthPicker,
            onSelectYearPicker,
            shouldResponsive,
            onDecreaseMonth,
            onIncreaseMonth,
            yearLabel,
            monthLabel,
            isJalaali,
          }}
        />
        <ToNavigator
          {...{
            isJalaali,
            onIncreaseMonth,
            onIncreaseYear,
            shouldResponsive,
            type,
          }}
        />
      </div>
    </Fragment>
  );
};

export { HeaderSide };
