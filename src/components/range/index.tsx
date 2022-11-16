import { RangePickerProps } from "../../core";
import { RangeProvider } from "../../core/context";
import RangePanel from "./rangePanel";

export const RangePicker = ({
  headerRender,
  dayLabelRender,
  panelRender,
  highlightOffDays,
  customColors,
  ...restProps
}: RangePickerProps) => {
  return (
    <RangeProvider props={restProps}>
      <RangePanel
        headerRender={headerRender}
        panelRender={panelRender}
        dayLabelRender={dayLabelRender}
        highlightOffDays={highlightOffDays}
        customColors={customColors}
      />
    </RangeProvider>
  );
};
