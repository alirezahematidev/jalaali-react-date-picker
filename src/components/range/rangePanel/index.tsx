import classNames from "classnames";
import moment from "moment-jalaali";
import { ForwardedRef, forwardRef, Ref } from "react";
import { RangeProps as Props, useRangepicker } from "../../../core";
import { RangePanelMode } from "./panelRangeMode";

moment.loadPersian({ dialect: "persian-modern" });

interface RangePanelProps extends Props {
  ref?: Ref<HTMLDivElement>;
  toggle?: () => void;
}

type RangePanelComponent = typeof RangePanel;

const RangePanel = (
  {
    headerRender,
    panelRender,
    highlightDays,
    dayLabelRender,
    onModeChange,
    highlightWeekend,
    className,
    style,
    toggle,
  }: RangePanelProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { isJalaali } = useRangepicker();

  return (
    <div
      ref={ref}
      className={classNames(
        isJalaali ? "panel-range-jalaali" : "panel-range-gregorian",
        "panel-elevation",
        className,
      )}
      style={style}
    >
      <RangePanelMode
        {...{
          headerRender,
          panelRender,
          dayLabelRender,
          highlightDays,
          onModeChange,
          highlightWeekend,
          toggle,
        }}
      />
    </div>
  );
};

const RangePanelWithRef = forwardRef<HTMLDivElement, RangePanelProps>(
  RangePanel,
) as RangePanelComponent;

export default RangePanelWithRef;
