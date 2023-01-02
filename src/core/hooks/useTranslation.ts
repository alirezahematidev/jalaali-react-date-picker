import { translations } from "../constants";
import { TranslationKey } from "../constants/translations";
import { useDatepicker } from "./index";

export const useTranslation = () => {
  const { locale } = useDatepicker();

  function t(key: TranslationKey) {
    return translations[locale || "fa"][key];
  }

  return { t, locale };
};
