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
  ({ renderFooter, renderHeader, renderPanel }: PanelProps) => {
    const { isJalaali } = useDatepicker();

    return (
      <div
        className={classNames(isJalaali ? "panel-jalaali" : "panel-gregorian")}
      >
        <PanelMode {...{ renderHeader, renderPanel }} />
        <Footer renderFooter={renderFooter} />
      </div>
    );
  },
  isEqual,
);

export default Panel;
