import { Time, TimeMode } from "./../../core/types/global.types";

const timePad = (value: number) => {
  return value.toString().padStart(2, "0");
};

const degreeToRadian = (degree: number) => {
  return degree * (Math.PI / 180);
};

const radianToDegree = (radian: number) => {
  return radian * (180 / Math.PI);
};

const createMarkets = (mode: TimeMode): number[] => {
  const markers = Array.from(
    { length: mode === "hour" ? 12 : 60 },
    (_, i) => i + 1,
  );

  return markers;
};

const formatTime = (time: Time) => {
  const hour = time.hour;
  const minute = time.minute === 60 ? 0 : time.minute;

  const format = timePad(hour) + ":" + timePad(minute);

  return format;
};

export { degreeToRadian, radianToDegree, createMarkets, formatTime, timePad };
