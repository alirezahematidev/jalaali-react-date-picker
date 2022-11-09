import { DatePickerProps } from "../../core";
import { Provider } from "../../core/context";
import RangePanel from "../rangePanel";

export const Range = ({
  footerRender,
  headerRender,
  dayLabelRender,
  panelRender,
  highlightOffDays,
  customColors,
  ...restProps
}: DatePickerProps) => {
  return (
    <Provider props={restProps}>
      <RangePanel
        footerRender={footerRender}
        headerRender={headerRender}
        panelRender={panelRender}
        dayLabelRender={dayLabelRender}
        highlightOffDays={highlightOffDays}
        customColors={customColors}
      />
    </Provider>
  );
};
