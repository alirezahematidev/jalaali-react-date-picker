import { useMemo } from "react";
import { RANGE_WIDTH } from "../constants/variables";
import { useWindowSize } from "./useWindowSize";

type Responsive = "desktop" | "mobile" | "auto";

export const useShouldResponsive = (responsive?: Responsive) => {
  const { width } = useWindowSize(responsive);

  const shouldResponsive = useMemo(() => {
    if (!responsive) return false;

    if (responsive === "mobile") return true;

    if (typeof window !== "undefined") {
      if (typeof navigator !== "undefined") {
        return (
          /(Android|iPhone)/i.test(navigator.userAgent) || width < RANGE_WIDTH
        );
      }

      return width < RANGE_WIDTH;
    }

    return false;
  }, [width, responsive]);

  return shouldResponsive;
};
