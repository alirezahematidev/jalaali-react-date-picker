import { useCallback } from "react";
import { useRangepicker, useRangeYears } from "../../../core";
import { useRangeTemplate } from "../rangePanel/templateContext";
import { RangeYeartemplate } from "./rangeYearTemplate";

export interface RangeYearsProps {}

const RangeYears = ({}: RangeYearsProps) => {
  const { onRangeYearchange, offsets, setOffsets } = useRangepicker();
  // const [offsets, setoffset] = useState<[number, number]>([0, 0]);
  const { type, onChangeMode } = useRangeTemplate();
  const { years, lowerDecade, upperDecade } = useRangeYears({
    type,
    offsets,
  });
  const onIncreaseDecade = useCallback(() => {
    setOffsets(
      type === "from"
        ? [offsets[0] + 10, offsets[1]]
        : [offsets[0], offsets[1] + 10],
    );
  }, [offsets, setOffsets, type]);

  const onDecreaseDecade = useCallback(() => {
    if (lowerDecade > 9) {
      setOffsets(
        type === "from"
          ? [offsets[0] - 10, offsets[1]]
          : [offsets[0], offsets[1] - 10],
      );
    }
  }, [lowerDecade, offsets, setOffsets, type]);

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

export default RangeYears;
