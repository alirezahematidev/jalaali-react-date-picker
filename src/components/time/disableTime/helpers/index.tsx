import { Time } from "../../../../core";
import * as c from "../../../../core/constants/variables";
import { arc } from "../../../../utils";

interface RenderMinProps {
  time?: Time;
}

interface RenderMaxProps {
  time?: Time;
}

const RenderMinMinute = ({ time }: RenderMinProps) => {
  if (!time || !time.minute) return null;

  return <path id="__path_min_minute" d={arc(0, time.minute * 6)} />;
};

const RenderMaxMinute = ({ time }: RenderMaxProps) => {
  if (!time || !time.minute) return null;

  return <path id="__path_max_minute" d={arc(time.minute * 6, c.FULL_DEG)} />;
};

const RenderMinHour = ({ time }: RenderMinProps) => {
  if (!time || !time.hour) return null;

  return <path id="__path_min_hour" d={arc(0, time.hour * 30)} />;
};

const RenderMaxHour = ({ time }: RenderMaxProps) => {
  if (!time || !time.hour) return null;

  return <path id="__path_max_hour" d={arc(time.hour * 30, c.FULL_DEG)} />;
};

export { RenderMaxHour, RenderMaxMinute, RenderMinHour, RenderMinMinute };
