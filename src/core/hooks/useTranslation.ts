import { useDatepicker } from "./index";
import { translations } from "../constants";
import { TranslationKey } from "../constants/translations";

export const useTranslation = () => {
  const { language } = useDatepicker();

  function t(key: TranslationKey) {
    return translations[language || "fa"][key];
  }

  return { t, language };
};
