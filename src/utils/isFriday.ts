import { DateTransformer } from "../core/types/global.types";
import { dateTransformer } from "./dateTransformer";

export const isJalaaliFriday = (date: DateTransformer): boolean => {
  const fridayLabel = dateTransformer(date, true).format("dddd");

  return fridayLabel === "جمعه";
};
