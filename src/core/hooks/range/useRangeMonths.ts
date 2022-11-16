import { useMemo } from "react";
import { generateDays } from "../../../utils";
import { localizedMonth } from "../../constants";
import { useRangePickerContext } from "../../context";

export const useRangeMonths = (type: "from" | "to") => {
  const {
    rangeState,
    locale: { language } = { language: "fa" },
    disabledDates,
    from,
    to,
  } = useRangePickerContext();

  const months = localizedMonth[language || "fa"];

  const fromMonths = useMemo(() => {
    return months.map((month) => {
      const { days } = generateDays(
        month.id,
        from.year,
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
  }, [disabledDates, from.year, language, months]);
  const toMonths = useMemo(() => {
    return months.map((month) => {
      const { days } = generateDays(
        month.id,
        to.year,
        language === "fa",
        disabledDates || (() => false),
      );
      if (
        days
          .filter((item) => item.month === month.id)
          .every((day) => day.isDisabled) ||
        (from.year === to.year && month.id <= from.month)
      ) {
        return { ...month, isDisabled: true };
      }
      return month;
    });
  }, [disabledDates, from.month, from.year, language, months, to.year]);

  return {
    months: type === "from" ? fromMonths : toMonths,
    fromMonths,
    toMonths,
  };
};
