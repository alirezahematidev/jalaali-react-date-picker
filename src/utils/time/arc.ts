import * as c from "../../core/constants/variables";

export function arc(startAngle: number, endAngle: number) {
  const innerStart = polarToCartesian(0, endAngle);
  const innerEnd = polarToCartesian(0, startAngle);
  const outerStart = polarToCartesian(c.RADIUS, endAngle);
  const outerEnd = polarToCartesian(c.RADIUS, startAngle);

  const flag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M",
    outerStart.x,
    outerStart.y,
    "A",
    c.SECTOR_X,
    c.SECTOR_Y,
    0,
    flag,
    0,
    outerEnd.x,
    outerEnd.y,
    "L",
    innerEnd.x,
    innerEnd.y,
    "A",
    0,
    0,
    0,
    flag,
    1,
    innerStart.x,
    innerStart.y,
    "L",
    outerStart.x,
    outerStart.y,
    "Z",
  ].join(" ");

  return d;
}

function polarToCartesian(radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / c.HALF_DEG;

  return {
    x: c.SECTOR_X + radius * Math.cos(angleInRadians),
    y: c.SECTOR_Y + radius * Math.sin(angleInRadians),
  };
}
