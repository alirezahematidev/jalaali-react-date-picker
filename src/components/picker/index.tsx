import { DatePickerProps } from "../../core";
import { Provider } from "../../core/context";
import Panel from "../panel";

export const Picker = ({
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
      <Panel
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
