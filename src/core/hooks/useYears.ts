import { useMemo } from "react";
import { generateDays, listOfYears } from "../../utils";
import { useDatePickerContext } from "../context/dateProvider";

export const useYears = (offset: number) => {
  const {
    state,
    locale: { language } = { language: "fa" },
    disabledDates,
  } = useDatePickerContext();

  const { years, lowerDecade, upperDecade } = listOfYears(
    language === "fa",
    offset,
  );

  const res = useMemo(() => {
    return years.map((year) => {
      const { days } = generateDays(
        state.month,
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
  }, [disabledDates, language, state.month, years]);

  return {
    years: res,
    lowerDecade,
    upperDecade,
  };
};
