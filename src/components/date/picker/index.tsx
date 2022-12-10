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
    onModeChange,
    nextIcon,
    prevIcon,
    superNextIcon,
    superPrevIcon,
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
        onModeChange={onModeChange}
        navigationIcons={{ nextIcon, prevIcon, superNextIcon, superPrevIcon }}
      />
    </DateProvider>
  );
};

const DatePickerWithRef = forwardRef<HTMLDivElement, DatePickerProps>(
  DatePicker,
) as DatePickerComponent;

export { DatePickerWithRef as DatePicker };
