import moment from "moment-jalaali";
import { useEffect } from "react";
import { transformMomentToTime } from "../../../utils";
import { Time } from "../../types";

type NowArgs = {
  handleGrabbed: boolean;
  showNow?: boolean;
  setter: (time: Time) => void;
  once: React.MutableRefObject<boolean>;
};

export const useNow = ({ handleGrabbed, setter, showNow, once }: NowArgs) => {
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
  }, [handleGrabbed, once, setter, showNow]);
};
