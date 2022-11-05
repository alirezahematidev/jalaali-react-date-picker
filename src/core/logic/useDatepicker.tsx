import { generateDays } from "../../utils/generateDays";
import { useDatePickerContext } from "../context";

export const useDatepicker = () => {
  const { state, ...rest } = useDatePickerContext();
  const { days } = generateDays(state.month, state.year);

  return {
    days,
    state,
    ...rest,
  };
};
