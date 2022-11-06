import { useLocale } from "../core";

export const useGetMonthLabel = () => {
  const { months } = useLocale();

  const getMonthLabels = (month: number) => {
    return months.find((item) => item.id === month)?.name;
  };

  return getMonthLabels;
};
