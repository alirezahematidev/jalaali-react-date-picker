import { generateDays } from "../../utils/generateDays";
import { useDatePickerContext } from "../context";
import { MonthKey } from "../types/global.types";

export const useDatepicker = () => {
  const { state, ...fns } = useDatePickerContext();
  const { days } = generateDays(state.month as MonthKey, state.year);

  return {
    days,
    state,
    ...fns,
  };
};
