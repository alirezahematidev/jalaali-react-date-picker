import { translations } from "../constants";
import { TranslationKey } from "../constants/translations";
import { useDatepicker } from "./index";

export const useTranslation = () => {
  const { language } = useDatepicker();

  function t(key: TranslationKey) {
    return translations[language || "fa"][key];
  }

  return { t, language };
};
