import { forwardRef } from "react";
import {
  RangePickerProps as Props,
  RangeProvider,
  useSetColors,
} from "../../core";
import RangePanel from "./rangePanel";

export interface RangePickerProps extends Props {}

const RangePicker = forwardRef<HTMLDivElement, RangePickerProps>(
  (rangeProps, ref) => {
    const {
      headerRender,
      dayLabelRender,
      panelRender,
      highlightDays,
      customColors,
      onModeChange,
      highlightWeekend,
      style,
      className,
      loading,
      ...restProps
    } = rangeProps;
    useSetColors(customColors);

    return (
      <RangeProvider props={restProps}>
        <RangePanel
          ref={ref}
          headerRender={headerRender}
          panelRender={panelRender}
          dayLabelRender={dayLabelRender}
          highlightDays={highlightDays}
          onModeChange={onModeChange}
          highlightWeekend={highlightWeekend}
          style={style}
          className={className}
          loading={loading}
        />
      </RangeProvider>
    );
  },
);

const RangePickerWithRef = RangePicker as (
  rangeProps: RangePickerProps,
) => JSX.Element;

export { RangePickerWithRef as RangePicker };
