import "../../styles/index.scss";
import moment from "moment-jalaali";
import { Days } from "../days";
import { useDatepicker } from "../../core/logic/useDatepicker";
import { useMemo, useState } from "react";
import { Months } from "../months";
import { Years } from "../years";
import classNames from "classnames";

moment.loadPersian({ dialect: "persian-modern" });

const Panel = () => {
  const { goToToday, isJalaali } = useDatepicker();
  const [mode, setMode] = useState<"day" | "month" | "year">("day");
  const modeContent = useMemo(
    () => ({
      day: <Days onChangeMode={setMode} />,
      month: (
        <Months onChangeMode={setMode} onSelectMonth={() => setMode("day")} />
      ),
      year: <Years onSelectYear={() => setMode("month")} />,
    }),
    [],
  );
  return (
    <div
      className={classNames(isJalaali ? "panel-jalaali" : "panel-gregorian")}
    >
      {modeContent[mode]}
      <div className="panel-footer-rtl">
        <p onClick={goToToday}>{isJalaali ? "امروز" : "Today"}</p>
      </div>
    </div>
  );
};

export default Panel;
