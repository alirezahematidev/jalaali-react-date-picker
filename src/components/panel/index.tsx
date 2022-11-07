import "../../styles/index.scss";
import moment from "moment-jalaali";
import { Days } from "../days";
import { useMemo, useState } from "react";
import { Months } from "../months";
import { Years } from "../years";
import classNames from "classnames";
import { useDatepicker, useTranslation } from "../../core";

moment.loadPersian({ dialect: "persian-modern" });

const Panel = () => {
  const { goToToday, isJalaali } = useDatepicker();
  const [mode, setMode] = useState<"day" | "month" | "year">("day");
  const { t } = useTranslation();

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
        <p onClick={goToToday} className="clickable">
          {t("today")}
        </p>
      </div>
    </div>
  );
};

export default Panel;
