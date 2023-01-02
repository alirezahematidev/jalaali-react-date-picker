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
    locale: locale = "fa",
    disabledDates,
  } = useRangePickerContext();

  const fromYearObject = listOfYears(locale === "fa", offsets?.[0]);

  const toYearObject = listOfYears(locale === "fa", offsets?.[1]);

  const fromYears = useMemo(() => {
    return fromYearObject.years.map((year) => {
      const { days } = generateDays(
        from.month,
        year.id,
        locale === "fa",
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
  }, [disabledDates, locale, from, fromYearObject.years]);

  const toYears = useMemo(() => {
    return toYearObject.years.map((year) => {
      const { days } = generateDays(
        to.month,
        year.id,
        locale === "fa",
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
  }, [toYearObject.years, to.month, locale, disabledDates]);
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
