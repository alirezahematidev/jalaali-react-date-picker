import { generateDays } from "../../utils";
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
