import { useRangeMonths, useRangepicker } from "../../../core";
import { useRangeTemplate } from "../rangePanel/templateContext";
import { RangeMonthtemplate } from "./rangeMonthTemplate";

export interface RangeMonthsProps {}

const RangeMonths = ({}: RangeMonthsProps) => {
  const { onRangeMonthchange } = useRangepicker();
  const { type } = useRangeTemplate();
  const { months } = useRangeMonths(type);

  return (
    <RangeMonthtemplate
      months={months}
      onSelect={(month) => {
        onRangeMonthchange(month, type);
      }}
    />
  );
};

export default RangeMonths;
