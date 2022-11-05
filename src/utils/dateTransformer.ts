import moment from "moment-jalaali";
import { DateTransformer } from "../core/types/global.types";

export const dateTransformer = (data: DateTransformer, isJalaali = true) => {
  const { day, month, year } = data;
  if (day < 1 || month < 1 || year < 1) {
    throw new Error("entered inputs are not valid");
  }

  const result = moment(
    `${year}-${month}-${day}`,
    isJalaali ? "jYYYY-jMM-jDD" : "YYYY-MM-DD",
  );
  if (!result.isValid()) {
    throw new Error("entered inputs are not valid");
  }

  return result;
};
