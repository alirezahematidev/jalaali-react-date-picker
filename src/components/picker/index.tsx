import { DatePickerProps } from "../../core";
import { Provider } from "../../core/context";
import Panel from "../panel";

export const Picker = ({
  renderFooter,
  renderHeader,
  renderPanel,
  ...restProps
}: DatePickerProps) => {
  return (
    <Provider props={restProps}>
      <Panel
        renderFooter={renderFooter}
        renderHeader={renderHeader}
        renderPanel={renderPanel}
      />
    </Provider>
  );
};
