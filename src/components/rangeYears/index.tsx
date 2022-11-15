import { useCallback, useState } from "react";
import { DateRangePickerTypes, useRangepicker } from "../../core";
import { useRangeYears } from "../../core/hooks/useRangeYears";
import { useRangeTemplate } from "../rangePanel/templateContext";
import { RangeYeartemplate } from "./rangeYearTemplate";

export interface RangeYearsProps {}

const RangeYears = ({}: RangeYearsProps) => {
  const { onRangeYearchange } = useRangepicker();
  const [offsets, setoffset] = useState<[number, number]>([0, 0]);
  const { type, onChangeMode } = useRangeTemplate();
  const { years, lowerDecade, upperDecade } = useRangeYears({
    type,
    offsets,
  });
  const onIncreaseDecade = useCallback(() => {
    setoffset((prev) => {
      return type === "from"
        ? [prev[0] + 10, prev[1]]
        : [prev[0], prev[1] + 10];
    });
  }, [type]);
  const onDecreaseDecade = useCallback(() => {
    setoffset((prev) => {
      return type === "from"
        ? [prev[0] - 10, prev[1]]
        : [prev[0], prev[1] - 10];
    });
  }, [type]);

  return (
    <RangeYeartemplate
      years={years}
      lowerDecade={lowerDecade}
      upperDecade={upperDecade}
      onSelect={(year) => {
        onRangeYearchange(year, type);
      }}
      onIncreaseDecade={onIncreaseDecade}
      onDecreaseDecade={onDecreaseDecade}
      onChangeMode={onChangeMode}
    />
  );
};

export { RangeYears };
