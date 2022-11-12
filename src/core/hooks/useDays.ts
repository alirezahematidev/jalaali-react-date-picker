import { useMemo } from "react";
import { generateDays } from "../../utils";
import { useDatePickerContext } from "../context/dateProvider";

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

  return {
    days,
  };
};
