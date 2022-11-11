import moment from "moment-jalaali";
import { useCallback, useMemo } from "react";
import { dateTransformer } from "../../utils";
import { localizedDayLabels, localizedMonth } from "../constants";
import { useDatePickerContext } from "../context/dateProvider";

export const useDatepicker = () => {
  const {
    state,
    cacheDate,
    locale: { language } = { language: "fa" },
    onDateChange,
    disabledDates,
    ...rest
  } = useDatePickerContext();

  const { isJalaali, months, dayLabels } = useMemo(() => {
    return {
      isJalaali: language === "fa",
      months: localizedMonth[language || "fa"],
      dayLabels: localizedDayLabels[language || "fa"],
    };
  }, [language]);

  const goToToday = useCallback(() => {
    const today = isJalaali
      ? {
          day: moment().jDate(),
          year: moment().jYear(),
          month: Number(moment().format("jM")),
        }
      : {
          day: moment().date(),
          year: moment().year(),
          month: Number(moment().format("M")),
        };

    const todayInMoment = dateTransformer({ ...today });
    const isTodayDisabled = disabledDates?.(todayInMoment);
    !isTodayDisabled && onDateChange(today);
  }, [disabledDates, isJalaali, onDateChange]);

  return {
    state,
    onDateChange,
    goToToday,
    isJalaali,
    language,
    months,
    dayLabels,
    cacheDate,
    ...rest,
  };
};
