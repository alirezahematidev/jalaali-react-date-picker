import { useMemo } from "react";
import { localizedDayLabels, localizedMonth } from "../../constants";
import { useRangePickerContext } from "../../context/range";

export const useRangepicker = () => {
  const {
    rangeState,
    cacheRangeDate,
    locale: { language } = { language: "fa" },
    onRangeDateChange,
    ...rest
  } = useRangePickerContext();

  const { isJalaali, months, dayLabels } = useMemo(() => {
    return {
      isJalaali: language === "fa",
      months: localizedMonth[language || "fa"],
      dayLabels: localizedDayLabels[language || "fa"],
    };
  }, [language]);

  return {
    rangeState,
    onRangeDateChange,
    isJalaali,
    language,
    months,
    dayLabels,
    cacheRangeDate,
    ...rest,
  };
};
