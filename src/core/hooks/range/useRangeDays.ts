import { useMemo } from "react";
import { generateDays } from "../../../utils";
import { useRangePickerContext } from "../../context";

export const useRangeDays = (type: "from" | "to") => {
  const { disabledDates, locale = "fa", from, to } = useRangePickerContext();

  const isJalaali = useMemo(() => locale === "fa", [locale]);

  const { days } = useMemo(
    () =>
      generateDays(
        from.month,
        from.year,
        isJalaali,
        disabledDates || (() => false),
      ),
    [disabledDates, isJalaali, from],
  );

  const { days: nextMonthDays } = useMemo(
    () =>
      generateDays(
        to.month,
        to.year,
        isJalaali,
        disabledDates || (() => false),
      ),
    [disabledDates, isJalaali, to],
  );

  const groupedRangeDays = [days, nextMonthDays];

  const flattenRangeDays = [...days, ...nextMonthDays].map(
    ({ day, month, year, isDisabled }) => ({ day, month, year, isDisabled }),
  );

  const res = type === "from" ? days : nextMonthDays;

  return {
    days: res,
    groupedRangeDays,
    flattenRangeDays,
  };
};
