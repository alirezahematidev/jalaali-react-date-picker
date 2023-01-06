import { ForwardedRef, forwardRef, Ref } from "react";
import {
  DatePickerProps as Props,
  DateProvider,
  useSetColors,
} from "../../../core";
import Panel from "../panel";

interface DatePickerProps extends Props {
  ref?: Ref<HTMLDivElement>;
}

type DatePickerComponent = typeof DatePicker;

const DatePicker = (
  dateProps: DatePickerProps,
  pickerRef: ForwardedRef<HTMLDivElement>,
) => {
  const {
    footerRender,
    headerRender,
    dayLabelRender,
    panelRender,
    highlightDays,
    customColors,
    onModeChange,
    nextIcon,
    prevIcon,
    superNextIcon,
    superPrevIcon,
    highlightWeekend,
    style,
    className,
    loading,
    ...restProps
  } = dateProps;
  useSetColors(customColors);

  return (
    <DateProvider props={restProps}>
      <Panel
        ref={pickerRef}
        footerRender={footerRender}
        headerRender={headerRender}
        panelRender={panelRender}
        dayLabelRender={dayLabelRender}
        highlightDays={highlightDays}
        highlightWeekend={highlightWeekend}
        onModeChange={onModeChange}
        navigationIcons={{ nextIcon, prevIcon, superNextIcon, superPrevIcon }}
        style={style}
        className={className}
        loading={loading}
      />
    </DateProvider>
  );
};

const DatePickerWithRef = forwardRef<HTMLDivElement, DatePickerProps>(
  DatePicker,
) as DatePickerComponent;

export { DatePickerWithRef as DatePicker };
