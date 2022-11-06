import moment from "moment-jalaali";
import { generateDays } from "../../utils";
import { useDatePickerContext } from "../context";

export const useDatepicker = () => {
  const { state, isJalaali, ...rest } = useDatePickerContext();
  const { days } = generateDays(state.month, state.year);

  const goToToday = () => {
    isJalaali
      ? rest.onDaychange({
          day: moment().jDate(),
          year: moment().jYear(),
          month: Number(moment().format("jM")),
        })
      : rest.onDaychange({
          day: moment().date(),
          year: moment().year(),
          month: Number(moment().format("M")),
        });
  };
  return {
    days,
    state,
    goToToday,
    isJalaali,
    ...rest,
  };
};
