import { DatePickerProps } from "../../core";
import { Provider } from "../../core/context";
import Panel from "../panel";

export const Picker = (props: DatePickerProps) => {
  return (
    <Provider props={props}>
      <Panel />
    </Provider>
  );
};
