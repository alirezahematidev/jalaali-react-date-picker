import "../../styles/index.scss";
import moment from "moment-jalaali";
import { memo } from "react";
import classNames from "classnames";
import { PanelProps, useDatepicker } from "../../core";
import { isEqual } from "lodash-es";
import { PanelMode } from "./panelMode";
import { Footer } from "../footer";

moment.loadPersian({ dialect: "persian-modern" });

const Panel = memo(
  ({
    renderFooter,
    renderHeader,
    renderCustomPanel,
    highlightOffDays,
    renderDayLabel,
  }: PanelProps) => {
    const { isJalaali } = useDatepicker();

    return (
      <div
        className={classNames(
          isJalaali ? "panel-jalaali" : "panel-gregorian",
          "panel-elevation",
        )}
      >
        <PanelMode
          {...{
            renderHeader,
            renderCustomPanel,
            renderDayLabel,
            highlightOffDays,
          }}
        />
        <Footer renderFooter={renderFooter} />
      </div>
    );
  },
  isEqual,
);

export default Panel;
