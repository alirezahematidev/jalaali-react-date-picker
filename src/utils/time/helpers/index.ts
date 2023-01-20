import moment, { Moment } from "moment-jalaali";
import { Time, TimeMode } from "../../../core/types/global.types";

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
  const hour = time.hour || 0;
  const minute = time.minute === 60 ? 0 : time.minute || 0;

  const format = timePad(hour) + ":" + timePad(minute);

  return format;
};

const transformTimeToMoment = (time: Time, use12Hours?: boolean): Moment => {
  return moment().set({
    hour: use12Hours ? (time.hour || 0) + 12 : time.hour,
    minute: time.minute,
  });
};

const transformMomentToTime = (time: Moment): Time => {
  if (!time.isValid()) {
    throw new Error("time moment inputs is invalid");
  }

  const h = time.hours();

  const m = time.minutes();

  const ah = h > 12 ? h - 12 : h;

  const fh = Number(time.format("hh"));

  const fm = Number(time.format("mm"));

  const hour = isNaN(fh) ? ah : fh;

  const minute = isNaN(fm) ? m : fm;

  return { hour, minute };
};

const formattedTime = (
  time: Time,
  format?: string | ((current: Moment) => string),
  use12Hours?: boolean,
) => {
  const m = transformTimeToMoment(time, use12Hours);

  if (!format) return m.format(use12Hours ? "HH:mm" : "hh:mm");

  if (typeof format === "function") {
    return m.format(format(moment()));
  }

  return m.format(format);
};

function existsTime(value?: number): value is number {
  return value !== undefined && typeof value === "number";
}

function invokeSync<T extends Function>(callback: T, delay = 0) {
  new Promise((resolve) => setTimeout(resolve, delay)).then(() => callback());
}

function noLimitProvided(minTime?: Time, maxTime?: Time) {
  let noLimit = true;

  if (minTime && !moment.isMoment(minTime) && Object.keys(minTime).length > 0) {
    noLimit = false;
  }

  if (maxTime && !moment.isMoment(maxTime) && Object.keys(maxTime).length > 0) {
    noLimit = false;
  }

  return noLimit;
}

export {
  degreeToRadian,
  radianToDegree,
  createMarkets,
  formatTime,
  timePad,
  transformMomentToTime,
  transformTimeToMoment,
  formattedTime,
  existsTime,
  invokeSync,
  noLimitProvided,
};
