import { Moment } from "moment-jalaali";
import { useMemo } from "react";
import { dateTransformer } from "../../../utils";
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

  const rangeStateMoment: [Moment, Moment | null] | null = useMemo(
    () =>
      rangeState?.startDate.day
        ? [
            dateTransformer(rangeState?.startDate, isJalaali),
            rangeState?.endDate
              ? dateTransformer(rangeState?.endDate, isJalaali)
              : null,
          ]
        : null,
    [isJalaali, rangeState?.endDate, rangeState?.startDate],
  );

  return {
    rangeState,
    onRangeDateChange,
    isJalaali,
    locale,
    months,
    dayLabels,
    cacheRangeDate,
    rangeStateMoment,
    ...rest,
  };
};
