import { JalaaliDay, MonthKey } from "../core/types/global.types";

export const dayModelGenerator = (
  count: number,
  monthId: MonthKey,
): JalaaliDay[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    day: i + 1,
    monthId,
  }));
};
