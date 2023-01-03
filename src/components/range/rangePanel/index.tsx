import classNames from "classnames";
import moment from "moment-jalaali";
import { ForwardedRef, forwardRef, Ref } from "react";
import {
  RangeProps as Props,
  useRangepicker,
  useSetColors,
} from "../../../core";
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
    highlightDays,
    dayLabelRender,
    customColors,
    onModeChange,
    weekend,
    className,
    style,
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
          customColors,
          onModeChange,
          weekend,
        }}
      />
    </div>
  );
};

const RangePanelWithRef = forwardRef<HTMLDivElement, RangePanelProps>(
  RangePanel,
) as RangePanelComponent;

export default RangePanelWithRef;
