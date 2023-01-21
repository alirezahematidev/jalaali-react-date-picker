import { forwardRef, Ref } from "react";
import {
  DatePickerProps as Props,
  DateProvider,
  useSetColors,
} from "../../../core";
import Panel from "../panel";

export interface DatePickerProps extends Props {
  ref?: Ref<HTMLDivElement>;
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (dateProps, ref) => {
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
          ref={ref}
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
  },
);

const DatePickerWithRef = DatePicker as (
  dateProps: DatePickerProps,
) => JSX.Element;

export { DatePickerWithRef as DatePicker };
