import { DatePickerProps } from "../../core";
import { Provider } from "../../core/context";
import Panel from "../panel";

export const Picker = ({
  renderFooter,
  renderHeader,
  renderDayLabel,
  renderCustomPanel,
  highlightOffDays,
  ...restProps
}: DatePickerProps) => {
  return (
    <Provider props={restProps}>
      <Panel
        renderFooter={renderFooter}
        renderHeader={renderHeader}
        renderCustomPanel={renderCustomPanel}
        renderDayLabel={renderDayLabel}
        highlightOffDays={highlightOffDays}
      />
    </Provider>
  );
};
