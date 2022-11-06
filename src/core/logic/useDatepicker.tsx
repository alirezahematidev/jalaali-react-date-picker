import moment from "moment-jalaali";
import { generateDays } from "../../utils";
import { useDatePickerContext } from "../context";

export const useDatepicker = () => {
  const { state, ...rest } = useDatePickerContext();
  const { days } = generateDays(state.month, state.year);

  const goToToday = () => {
    rest.onDaychange({
      day: moment().jDate(),
      year: moment().jYear(),
      month: Number(moment().format("jM")),
    });
  };
  return {
    days,
    state,
    goToToday,
    ...rest,
  };
};
