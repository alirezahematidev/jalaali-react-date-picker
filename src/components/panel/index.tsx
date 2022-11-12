import "../../styles/index.scss";
import moment from "moment-jalaali";
import { memo } from "react";
import classNames from "classnames";
import { PanelProps, useDatepicker, useSetColors } from "../../core";
import { isEqual } from "lodash-es";
import { PanelMode } from "./panelMode";
import { Footer } from "../footer";

moment.loadPersian({ dialect: "persian-modern" });

const Panel = memo(
  ({
    footerRender,
    headerRender,
    panelRender,
    highlightOffDays,
    dayLabelRender,
    onModeChange,
    customColors,
  }: PanelProps) => {
    const { isJalaali } = useDatepicker();

    useSetColors(customColors);

    return (
      <div
        className={classNames(
          isJalaali ? "panel-jalaali" : "panel-gregorian",
          "panel-elevation",
        )}
      >
        <PanelMode
          {...{
            headerRender,
            panelRender,
            dayLabelRender,
            highlightOffDays,
            onModeChange,
          }}
        />
        <Footer footerRender={footerRender} />
      </div>
    );
  },
  isEqual,
);

export default Panel;
