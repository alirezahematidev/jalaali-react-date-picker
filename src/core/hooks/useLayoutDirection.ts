import { useTranslation } from "./useTranslation";

export const useLayoutDirection = () => {
  const { language } = useTranslation();

  const isRtl = language === "fa";

  return { isRtl };
};
