import { ForwardedRef, forwardRef, Ref } from "react";
import { RangePickerProps as Props, RangeProvider } from "../../core";
import RangePanel from "./rangePanel";

interface RangePickerProps extends Props {
  ref?: Ref<HTMLDivElement>;
}

type RangePickerComponent = typeof RangePicker;

const RangePicker = (
  rangeProps: RangePickerProps,
  pickerRef: ForwardedRef<HTMLDivElement>,
) => {
  const {
    headerRender,
    dayLabelRender,
    panelRender,
    highlightDays,
    customColors,
    onModeChange,
    weekend,
    style,
    className,
    ...restProps
  } = rangeProps;
  return (
    <RangeProvider props={restProps}>
      <RangePanel
        ref={pickerRef}
        headerRender={headerRender}
        panelRender={panelRender}
        dayLabelRender={dayLabelRender}
        highlightDays={highlightDays}
        customColors={customColors}
        onModeChange={onModeChange}
        weekend={weekend}
        style={style}
        className={className}
      />
    </RangeProvider>
  );
};

const RangePickerWithRef = forwardRef<HTMLDivElement, RangePickerProps>(
  RangePicker,
) as RangePickerComponent;

export { RangePickerWithRef as RangePicker };
