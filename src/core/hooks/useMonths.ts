import { useMemo } from "react";
import { generateDays } from "../../utils";
import { localizedMonth } from "../constants";
import { useDatePickerContext } from "../context";

export const useMonths = () => {
  const {
    state,
    locale: { language } = { language: "fa" },
    disabledDates,
  } = useDatePickerContext();

  const months = localizedMonth[language || "fa"];

  const res = useMemo(() => {
    return months.map((month) => {
      const { days } = generateDays(
        month.id,
        state.year,
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
  }, [disabledDates, language, months, state.year]);

  return {
    months: res,
  };
};
