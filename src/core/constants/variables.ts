//global
const isServer = typeof window === "undefined";
const isClient = typeof window !== "undefined";
const isDOM = typeof document !== "undefined";

//date
const DATE_WIDTH = 300;
const DATE_HEIGHT = 352;

//range
const RANGE_WIDTH = 600;
const RANGE_HEIGHT = 312;
const RESP_RANGE_HEIGHT = 360;

//time
const HOUR_TICK = 30; // in degree
const MINUTE_TICK = 1; // in degree
const CLOCK_WIDTH = 220;
const CLOCK_HEIGHT = 220;
const ORIGIN_X = (CLOCK_WIDTH - 4) / 2;
const ORIGIN_Y = CLOCK_HEIGHT / 2;
const MARK_SIZE = 36;

export {
  isServer,
  isClient,
  isDOM,
  DATE_WIDTH,
  DATE_HEIGHT,
  RANGE_WIDTH,
  RANGE_HEIGHT,
  RESP_RANGE_HEIGHT,
  HOUR_TICK,
  MINUTE_TICK,
  CLOCK_WIDTH,
  CLOCK_HEIGHT,
  ORIGIN_X,
  ORIGIN_Y,
  MARK_SIZE,
};
