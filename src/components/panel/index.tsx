import "../../styles/index.scss";
import moment from "moment-jalaali";
import { Days } from "../days";
import { useDatepicker } from "../../core/logic/useDatepicker";
import { useMemo, useState } from "react";
import { Months } from "../months";
import { Years } from "../years";

moment.loadPersian({ dialect: "persian-modern" });

const Panel = () => {
  const { goToToday } = useDatepicker();
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
    <div className="panel-rtl">
      {modeContent[mode]}
      <div className="panel-footer-rtl">
        <p onClick={goToToday}>امروز</p>
      </div>
    </div>
  );
};

export default Panel;
