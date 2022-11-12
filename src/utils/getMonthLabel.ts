import { useDatepicker } from "../core";

export const useGetMonthLabel = () => {
  const { months } = useDatepicker();
  const getMonthLabels = (month: number) => {
    return months.find((item) => item.id === month)?.name;
  };

  return getMonthLabels;
};
