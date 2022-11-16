import { useMemo } from "react";
import { generateDays, listOfYears } from "../../../utils";
import { useRangePickerContext } from "../../context";

export const useRangeYears = ({
  offsets,
  type,
}: {
  type: "from" | "to";
  offsets: [number, number];
}) => {
  const {
    from,
    to,
    locale: { language } = { language: "fa" },
    disabledDates,
  } = useRangePickerContext();

  const fromYearObject = listOfYears(language === "fa", offsets?.[0]);

  const toYearObject = listOfYears(language === "fa", offsets?.[1]);

  const fromYears = useMemo(() => {
    return fromYearObject.years.map((year) => {
      const { days } = generateDays(
        from.month,
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
  }, [disabledDates, language, from, fromYearObject.years]);

  const toYears = useMemo(() => {
    return toYearObject.years.map((year) => {
      const { days } = generateDays(
        to.month,
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
  }, [toYearObject.years, to.month, language, disabledDates]);
  return {
    years: type === "from" ? fromYears : toYears,
    lowerDecade:
      type === "from" ? fromYearObject.lowerDecade : toYearObject.lowerDecade,
    upperDecade:
      type === "from" ? fromYearObject.upperDecade : toYearObject.upperDecade,
    fromYears,
    toYears,
    startLowerDecade: fromYearObject.lowerDecade,
    startUpperDecade: fromYearObject.upperDecade,
    endLowerDecade: toYearObject.lowerDecade,
    endUpperDecade: toYearObject.upperDecade,
  };
};
