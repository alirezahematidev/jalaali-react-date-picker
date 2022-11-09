import moment from "moment-jalaali";
import { DatePickerTypes } from "../core";
import { DateMetadata } from "../core/types/global.types";

export const dayModelGenerator = (
  count: number,
  month: number,
  year: number,
  isJalaali: boolean,
  disabledDates?: DatePickerTypes.DisabledDates,
): DateMetadata[] => {
  return Array.from({ length: count }, (_, i) => {
    const generatedDayInMoment = isJalaali
      ? moment(`${year}-${month}-${i + 1}`, "jYYYY-jMM-jDD")
      : moment(`${year}-${month}-${i + 1}`, "YYYY-MM-DD");
    const weekday = generatedDayInMoment.weekday();

    const isDisabled = disabledDates
      ? disabledDates(generatedDayInMoment)
      : false;

    return {
      id: `${i + 1}`,
      day: i + 1,
      month,
      year,
      isWeekend: isJalaali ? weekday === 6 : weekday === 1,
      isDisabled,
    };
  });
};
