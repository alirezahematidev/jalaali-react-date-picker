import { useCallback } from "react";
import { useDatepicker } from "../core";

export const useGetMonthLabel = () => {
  const { months } = useDatepicker();
  const getMonthLabels = useCallback(
    (month: number) => {
      return months.find((item) => item.id === month)?.name || "";
    },
    [months],
  );
  return getMonthLabels;
};
