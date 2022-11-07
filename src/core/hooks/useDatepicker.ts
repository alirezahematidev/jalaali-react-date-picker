import moment from "moment-jalaali";
import { useCallback, useMemo } from "react";
import { dateTransformer, generateDays } from "../../utils";
import { localizedDayLabels, localizedMonth } from "../constants";
import { useDatePickerContext } from "../context";

export const useDatepicker = () => {
  const { state, locale, highlightOffDays, ...rest } = useDatePickerContext();

  const language = locale?.language || "fa";

  const isJalaali = language === "fa";

  const months = localizedMonth[language];

  const dayLabels = localizedDayLabels[language];

  const { days: _days } = generateDays(state.month, state.year, isJalaali);

  const { canHighlighWeekend, days } = useMemo(() => {
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

    const days = _days.map((date) => {
      return {
        ...date,
        isOff: customDates?.some(
          (d) =>
            d.day === date.day &&
            d.month === date.month &&
            d.year === date.year,
        ),
      };
    });

    return { canHighlighWeekend, days };
  }, [_days, highlightOffDays]);

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
