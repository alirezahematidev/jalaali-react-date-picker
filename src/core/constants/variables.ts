const isServer = typeof window === "undefined";

const isClient = typeof window !== "undefined";

const isDOM = typeof document !== "undefined";

const DATE_WIDTH = 300;
const DATE_HEIGHT = 352;
const RANGE_WIDTH = 600;
const RANGE_HEIGHT = 312;
const RESP_RANGE_HEIGHT = 360;

export {
  isServer,
  isClient,
  isDOM,
  DATE_WIDTH,
  DATE_HEIGHT,
  RANGE_WIDTH,
  RANGE_HEIGHT,
  RESP_RANGE_HEIGHT,
};
