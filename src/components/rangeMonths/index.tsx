import { useRangepicker } from "../../core";
import { useRangeMonths } from "../../core/hooks/useRangeMonths";
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

export { RangeMonths };
