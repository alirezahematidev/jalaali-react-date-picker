import { useEffect, useState } from "react";

type WindowLayout = {
  width: number;
  height: number;
};

export const useWindowSize = () => {
  const [size, setSize] = useState<WindowLayout>({
    width: window?.innerWidth,
    height: window?.innerHeight,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handler);
    handler();

    return () => window.removeEventListener("resize", handler);
  }, []);

  return size;
};
