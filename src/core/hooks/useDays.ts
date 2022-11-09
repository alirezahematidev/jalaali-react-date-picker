import { useMemo } from "react";
import { generateDays } from "../../utils";
import { useDatePickerContext } from "../context";

export const useDays = () => {
  const {
    state,
    disabledDates,
    locale: { language } = {},
  } = useDatePickerContext();
  const isJalaali = useMemo(() => language === "fa", [language]);
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

  const { days: nextMonthDays } = useMemo(
    () =>
      generateDays(
        state.month === 12 ? 1 : state.month + 1,
        state.month === 12 ? state.year + 1 : state.year,
        isJalaali,
        disabledDates || (() => false),
      ),
    [disabledDates, isJalaali, state.month, state.year],
  );

  const groupedRangeDays = [days, nextMonthDays];

  return {
    days,
    groupedRangeDays,
  };
};
