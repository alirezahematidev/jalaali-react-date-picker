import { translations } from "../constants";
import { TranslationKey } from "../constants/translations";
import { useDatepicker, useRangepicker } from "./index";

export const useTranslation = () => {
  const { locale } = useDatepicker();

  function t(key: TranslationKey) {
    return translations[locale || "fa"][key];
  }

  return { t, locale };
};

export const useRangeTranslation = () => {
  const { locale } = useRangepicker();

  function t(key: TranslationKey) {
    return translations[locale || "fa"][key];
  }

  return { t, locale };
};
