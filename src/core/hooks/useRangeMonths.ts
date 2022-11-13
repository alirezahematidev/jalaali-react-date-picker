import { useMemo } from "react";
import { generateDays } from "../../utils";
import { localizedMonth } from "../constants";
import { useRangePickerContext } from "../context";

export const useRangeMonths = () => {
  const {
    rangeState,
    locale: { language } = { language: "fa" },
    disabledDates,
  } = useRangePickerContext();

  const months = localizedMonth[language || "fa"];

  const currentMonths = useMemo(() => {
    return months.map((month) => {
      const { days } = generateDays(
        month.id,
        rangeState.startDate.year,
        language === "fa",
        disabledDates || (() => false),
      );
      if (
        days
          .filter((item) => item.month === month.id)
          .every((day) => day.isDisabled)
      ) {
        return { ...month, isDisabled: true };
      }
      return month;
    });
  }, [disabledDates, language, months, rangeState]);

  const nextMonths = useMemo(() => {
    return months.map((month) => {
      const { days } = generateDays(
        month.id,
        rangeState.endDate?.year || rangeState.startDate.year,
        language === "fa",
        disabledDates || (() => false),
      );
      if (
        days
          .filter((item) => item.month === month.id)
          .every((day) => day.isDisabled)
      ) {
        return { ...month, isDisabled: true };
      }
      return month;
    });
  }, [disabledDates, language, months, rangeState]);

  return {
    currentMonths,
    nextMonths,
  };
};
