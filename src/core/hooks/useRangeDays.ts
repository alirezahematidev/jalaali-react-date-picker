import { useMemo } from "react";
import { generateDays } from "../../utils";
import { useRangePickerContext } from "../context";

export const useRangeDays = () => {
  const {
    rangeState,
    disabledDates,
    locale: { language } = { language: "fa" },
  } = useRangePickerContext();

  const isJalaali = useMemo(() => language === "fa", [language]);

  const { days } = useMemo(
    () =>
      generateDays(
        rangeState.startDate.month,
        rangeState.startDate.year,
        isJalaali,
        disabledDates || (() => false),
      ),
    [disabledDates, isJalaali, rangeState],
  );

  const { days: nextMonthDays } = useMemo(
    () =>
      generateDays(
        rangeState.startDate?.month + 1,
        rangeState.endDate?.year || rangeState.startDate.year,
        isJalaali,
        disabledDates || (() => false),
      ),
    [disabledDates, isJalaali, rangeState],
  );

  console.log({ nextMonthDays });

  const groupedRangeDays = [days, nextMonthDays];

  const flattenRangeDays = [...days, ...nextMonthDays].map(
    ({ day, month, year, isDisabled }) => ({ day, month, year, isDisabled }),
  );

  return {
    groupedRangeDays,
    flattenRangeDays,
  };
};
