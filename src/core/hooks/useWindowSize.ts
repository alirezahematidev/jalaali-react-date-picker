import { useEffect, useState } from "react";
import { isServer } from "../constants/variables";

type WindowLayout = {
  width: number;
  height: number;
};

export const useWindowSize = () => {
  const [size, setSize] = useState<WindowLayout>({
    width: isServer ? 0 : window?.innerWidth,
    height: isServer ? 0 : window?.innerHeight,
  });

  useEffect(() => {
    if (isServer) return;

    const handler = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handler);

    handler();

    return () => window.removeEventListener("resize", handler);
  }, []);

  return size;
};
