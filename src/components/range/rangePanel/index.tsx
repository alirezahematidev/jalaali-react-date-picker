import classNames from "classnames";
import moment from "moment-jalaali";
import { ForwardedRef, forwardRef, Ref } from "react";
import {
  RangePanelProps as Props,
  useDatepicker,
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
  }: RangePanelProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { isJalaali } = useDatepicker();

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
        }}
      />
    </div>
  );
};

const RangePanelWithRef = forwardRef<HTMLDivElement, RangePanelProps>(
  RangePanel,
) as RangePanelComponent;

export default RangePanelWithRef;
