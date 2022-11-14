import "../../styles/index.scss";
import moment from "moment-jalaali";
import { memo } from "react";
import classNames from "classnames";
import { RangePanelProps, useDatepicker, useSetColors } from "../../core";
import { isEqual } from "lodash-es";
import { RangePanelMode } from "./panelRangeMode";

moment.loadPersian({ dialect: "persian-modern" });

const RangePanel = memo(
  ({
    headerRender,
    panelRender,
    highlightOffDays,
    dayLabelRender,
    customColors,
  }: RangePanelProps) => {
    const { isJalaali } = useDatepicker();

    useSetColors(customColors);
    return (
      <div
        className={classNames(
          isJalaali ? "panel-range-jalaali" : "panel-range-gregorian",
          "panel-elevation",
        )}
      >
        <RangePanelMode
          {...{
            headerRender,
            panelRender,
            dayLabelRender,
            highlightOffDays,
          }}
        />
      </div>
    );
  },
  isEqual,
);

export default RangePanel;
