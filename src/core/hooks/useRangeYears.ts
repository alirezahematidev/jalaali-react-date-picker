import { useMemo } from "react";
import { generateDays, listOfYears } from "../../utils";
import { useRangePickerContext } from "../context";

export const useRangeYears = (offsets: [number, number]) => {
  const {
    rangeState,
    locale: { language } = { language: "fa" },
    disabledDates,
  } = useRangePickerContext();

  const currentYearObject = listOfYears(language === "fa", offsets?.[0]);

  const nextYearObject = listOfYears(language === "fa", offsets?.[1]);

  const currentYears = useMemo(() => {
    return currentYearObject.years.map((year) => {
      const { days } = generateDays(
        rangeState.startDate.month,
        year.id,
        language === "fa",
        disabledDates || (() => false),
      );
      if (
        days
          .filter((item) => item.year === year.id)
          .every((day) => day.isDisabled)
      ) {
        return { ...year, isDisabled: true };
      }
      return year;
    });
  }, [disabledDates, language, rangeState, currentYearObject.years]);

  const nextYears = useMemo(() => {
    return nextYearObject.years.map((year) => {
      const { days } = generateDays(
        rangeState.endDate?.month || rangeState.startDate.month + 1,
        year.id,
        language === "fa",
        disabledDates || (() => false),
      );
      if (
        days
          .filter((item) => item.year === year.id)
          .every((day) => day.isDisabled)
      ) {
        return { ...year, isDisabled: true };
      }
      return year;
    });
  }, [disabledDates, nextYearObject.years, language, rangeState]);

  return {
    currentYears,
    nextYears,
    startLowerDecade: currentYearObject.lowerDecade,
    startUpperDecade: currentYearObject.upperDecade,
    endLowerDecade: nextYearObject.lowerDecade,
    endUpperDecade: nextYearObject.upperDecade,
  };
};
