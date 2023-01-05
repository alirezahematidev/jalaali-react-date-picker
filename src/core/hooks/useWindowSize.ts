import { useEffect, useState } from "react";
import { isServer } from "../constants/variables";

type WindowLayout = {
  width: number;
  height: number;
};

type Responsive = "desktop" | "mobile" | "auto";

export const useWindowSize = (responsive?: Responsive) => {
  const [size, setSize] = useState<WindowLayout>({
    width: isServer ? 0 : window?.innerWidth,
    height: isServer ? 0 : window?.innerHeight,
  });

  useEffect(() => {
    if (isServer || (responsive && responsive !== "auto")) return;

    const handler = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handler);

    handler();

    return () => window.removeEventListener("resize", handler);
  }, [responsive]);

  return size;
};
