import moment from "moment-jalaali";
import { generateDays } from "../../utils";
import { localizedDayLabels, localizedMonth } from "../constants";
import { useDatePickerContext } from "../context";

export const useDatepicker = () => {
  const { state, cacheDate, locale, ...rest } = useDatePickerContext();

  const language = locale?.language || "fa";

  const isJalaali = language === "fa";

  const months = localizedMonth[language];

  const dayLabels = localizedDayLabels[language];

  const { days } = generateDays(
    (state || cacheDate).month,
    (state || cacheDate).year,
    isJalaali,
  );

  const goToToday = () => {
    isJalaali
      ? rest.onDateChange({
          day: moment().jDate(),
          year: moment().jYear(),
          month: Number(moment().format("jM")),
        })
      : rest.onDateChange({
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
    cacheDate,
    ...rest,
  };
};
