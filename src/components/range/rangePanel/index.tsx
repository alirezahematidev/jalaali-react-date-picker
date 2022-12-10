import classNames from "classnames";
import moment from "moment-jalaali";
import { ForwardedRef, forwardRef, Ref } from "react";
import {
  RangePanelProps as Props,
  useRangepicker,
  useSetColors,
} from "../../../core";
import "../../../styles/index.scss";
import { RangePanelMode } from "./panelRangeMode";

moment.loadPersian({ dialect: "persian-modern" });

interface RangePanelProps extends Props {
  ref?: Ref<HTMLDivElement>;
}

type RangePanelComponent = typeof RangePanel;

const RangePanel = (
  {
    headerRender,
    panelRender,
    highlightOffDays,
    dayLabelRender,
    customColors,
    onModeChange,
  }: RangePanelProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { isJalaali } = useRangepicker();
  useSetColors(customColors);

  return (
    <div
      ref={ref}
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
          customColors,
          onModeChange,
        }}
      />
    </div>
  );
};

const RangePanelWithRef = forwardRef<HTMLDivElement, RangePanelProps>(
  RangePanel,
) as RangePanelComponent;

export default RangePanelWithRef;
