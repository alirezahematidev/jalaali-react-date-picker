import moment from "moment-jalaali";
import { useMemo } from "react";
import { generateDays } from "../../utils";
import { localizedDayLabels, localizedMonth } from "../constants";
import { useDatePickerContext } from "../context";

export const useDatepicker = () => {
  const { state, locale, highlightOffDays, ...rest } = useDatePickerContext();

  const language = locale?.language || "fa";

  const isJalaali = language === "fa";

  const months = localizedMonth[language];

  const dayLabels = localizedDayLabels[language];

  const { days } = generateDays(state.month, state.year, isJalaali);

  const { canHighlighWeekend, customDates } = useMemo(() => {
    const isWeekendDefined =
      highlightOffDays && highlightOffDays.weekend !== undefined;

    const canHighlighWeekend = isWeekendDefined
      ? highlightOffDays?.weekend
      : true;

    const isCustomDatesDefined =
      highlightOffDays && highlightOffDays.customDates !== undefined;

    const customDates = isCustomDatesDefined
      ? highlightOffDays?.customDates
      : [];

    return { canHighlighWeekend, customDates };
  }, [highlightOffDays]);

  const goToToday = () => {
    isJalaali
      ? rest.onDaychange({
          day: moment().jDate(),
          year: moment().jYear(),
          month: Number(moment().format("jM")),
        })
      : rest.onDaychange({
          day: moment().date(),
          year: moment().year(),
          month: Number(moment().format("M")),
        });
  };
  return {
    days,
    state,
    goToToday,
    isJalaali,
    language,
    months,
    dayLabels,
    canHighlighWeekend,
    ...rest,
  };
};
