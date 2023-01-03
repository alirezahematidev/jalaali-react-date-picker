import { useMemo } from "react";
import { generateDays } from "../../../utils";
import { useDatePickerContext } from "../../context/date/dateProvider";

export const useDays = () => {
  const { state, disabledDates, locale = "fa" } = useDatePickerContext();
  const isJalaali = useMemo(() => locale === "fa", [locale]);
  const { days } = useMemo(
    () =>
      generateDays(
        state.month,
        state.year,
        isJalaali,
        disabledDates || (() => false),
      ),
    [disabledDates, isJalaali, state.month, state.year],
  );

  return {
    days,
  };
};
