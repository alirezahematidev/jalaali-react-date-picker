import { localizedDayLabels, localizedMonth } from "../constants";
import { useDatePickerContext } from "../context";

export const useLocale = () => {
  const { locale } = useDatePickerContext();

  const language = locale?.language || "fa";

  const months = localizedMonth[language];

  const dayLabels = localizedDayLabels[language];

  const isPersian = language === "fa";

  return { months, dayLabels, isPersian };
};
