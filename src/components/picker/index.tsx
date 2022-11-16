import { DatePickerProps, DateProvider } from "../../core";
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
    <DateProvider props={restProps}>
      <Panel
        footerRender={footerRender}
        headerRender={headerRender}
        panelRender={panelRender}
        dayLabelRender={dayLabelRender}
        highlightOffDays={highlightOffDays}
        customColors={customColors}
      />
    </DateProvider>
  );
};
