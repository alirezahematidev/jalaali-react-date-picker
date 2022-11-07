import moment from "moment-jalaali";
import { DateMetadata } from "../core/types/global.types";

export const dayModelGenerator = (
  count: number,
  month: number,
  year: number,
  isJalaali: boolean,
): DateMetadata[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    day: i + 1,
    month,
    year,
    isWeekend: isJalaali
      ? moment(`${year}-${month}-${i + 1}`, "jYYYY-jMM-jDD").weekday() === 6
      : moment(`${year}-${month}-${i + 1}`, "YYYY-MM-DD").weekday() === 1,
  }));
};
