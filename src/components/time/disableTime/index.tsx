import { Time, TimeMode } from "../../../core";
import { CLOCK_HEIGHT, CLOCK_WIDTH } from "../../../core/constants/variables";
import {
  RenderMaxHour,
  RenderMaxMinute,
  RenderMinHour,
  RenderMinMinute,
} from "./helpers";

interface DisableTimeProps {
  mode: TimeMode;
  minTime?: Time;
  maxTime?: Time;
}

const DisableTime = ({ mode, maxTime, minTime }: DisableTimeProps) => {
  if (!maxTime && !minTime) return null;

  if (mode === "hour") {
    return (
      <svg id="hour_svg" width={CLOCK_WIDTH} height={CLOCK_HEIGHT}>
        <RenderMinHour time={minTime} />
        <RenderMaxHour time={maxTime} />
      </svg>
    );
  }

  return (
    <svg id="minute_svg" width={CLOCK_WIDTH} height={CLOCK_HEIGHT}>
      <RenderMinMinute time={minTime} />
      <RenderMaxMinute time={maxTime} />
    </svg>
  );
};

export { DisableTime };
