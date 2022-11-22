import { ForwardedRef, forwardRef, Ref } from "react";
import { DatePickerProps as Props, DateProvider } from "../../../core";
import Panel from "../panel";

interface DatePickerProps extends Props {
  ref?: Ref<HTMLDivElement>;
}

type DatePickerComponent = typeof DatePicker;

const DatePicker = (
  {
    footerRender,
    headerRender,
    dayLabelRender,
    panelRender,
    highlightOffDays,
    customColors,
    ...restProps
  }: DatePickerProps,
  pickerRef: ForwardedRef<HTMLDivElement>,
) => {
  return (
    <DateProvider props={restProps}>
      <Panel
        ref={pickerRef}
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

const DatePickerWithRef = forwardRef<HTMLDivElement, DatePickerProps>(
  DatePicker,
) as DatePickerComponent;

export { DatePickerWithRef as DatePicker };
