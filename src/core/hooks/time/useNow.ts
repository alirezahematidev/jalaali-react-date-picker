import moment from "moment-jalaali";
import { useEffect, useRef } from "react";
import { transformMomentToTime } from "../../../utils";
import { Time } from "../../types";

type NowArgs = {
  handleGrabbed: boolean;
  showNow?: boolean;
  setter: (time: Time) => void;
};

export const useNow = ({ handleGrabbed, setter, showNow }: NowArgs) => {
  const once = useRef<boolean>(true);

  useEffect(() => {
    if (!showNow || handleGrabbed) return;
    const t = transformMomentToTime(moment());

    const timer = setInterval(() => {
      const time = transformMomentToTime(moment());
      setter(time);
    }, 1000);

    if (once.current) {
      setter(t);
      once.current = false;
    }

    return () => clearInterval(timer);
  }, [handleGrabbed, setter, showNow]);
};
