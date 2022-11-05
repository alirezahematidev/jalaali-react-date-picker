import { JalaaliDay } from "../core/types/global.types";

export const dayModelGenerator = (
  count: number,
  month: number,
  year: number,
): JalaaliDay[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    day: i + 1,
    month,
    year,
  }));
};
