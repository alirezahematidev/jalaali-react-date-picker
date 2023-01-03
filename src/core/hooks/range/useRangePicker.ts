import { useMemo } from "react";
import { localizedDayLabels, localizedMonth } from "../../constants";
import { useRangePickerContext } from "../../context/range";

export const useRangepicker = () => {
  const {
    rangeState,
    cacheRangeDate,
    locale: locale = "fa",
    onRangeDateChange,
    ...rest
  } = useRangePickerContext();

  const { isJalaali, months, dayLabels } = useMemo(() => {
    return {
      isJalaali: locale === "fa",
      months: localizedMonth[locale || "fa"],
      dayLabels: localizedDayLabels[locale || "fa"],
    };
  }, [locale]);

  return {
    rangeState,
    onRangeDateChange,
    isJalaali,
    locale,
    months,
    dayLabels,
    cacheRangeDate,
    ...rest,
  };
};
