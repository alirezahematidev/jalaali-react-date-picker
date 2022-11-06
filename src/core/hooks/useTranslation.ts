import { translations } from "../constants";
import { TranslationKey } from "../constants/translations";
import { useDatePickerContext } from "../context";

export const useTranslation = () => {
  const { locale } = useDatePickerContext();

  function t(key: TranslationKey) {
    const language = locale?.language || "fa";

    return translations[language][key];
  }

  return { t, language: locale?.language || "fa" };
};
