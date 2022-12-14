import classNames from "classnames";
import { useState } from "react";
import Panel from "../../components/date/panel";
import { DateProvider, InputDatePickerProps } from "../../core";
import "../../styles/index.css";
import { Popup } from "../popup";
import { Suffix } from "../suffix";

export const InputDatePicker = ({
  value,
  onChange,
  onDayChange,
  onMonthChange,
  onYearChange,
  format,
  locale,
  disabledDates,
  open,
  onOpenChange,
  pickerProps,
  disabled,
  suffixIcon,
  prefixIcon,
  placement = "bottom",
  className,
  wrapperClassName,
  wrapperStyle,
  ...rest
}: InputDatePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(open);
  const isRtl = (locale?.language || "fa") === "fa";

  const toggle = () => {
    if (disabled) return;

    setIsOpen((prev) => !prev);
    onOpenChange?.(isOpen === undefined ? false : isOpen);
    return true;
  };

  const close = () => {
    setIsOpen(false);
    onOpenChange?.(false);
  };
  const [clearIconVisible, setClearIconVisible] = useState(false);

  return (
    <DateProvider
      props={{
        value,
        onChange,
        onMonthChange,
        onYearChange,
        format,
        disabledDates,
        locale,
        onDayChange,
      }}
    >
      {({ onChangeInputValue, onEmptyInputValue, ...inputProps }) => (
        <Popup
          key="date-popup"
          mode="date"
          placement={placement}
          isOpen={isOpen}
          close={close}
          toggle={toggle}
          panel={<Panel toggle={toggle} {...pickerProps} />}
        >
          <div
            dir={isRtl ? "rtl" : "ltr"}
            aria-label="datepicker"
            className={classNames(
              "picker-input-wrapper",
              isRtl && "rtl",
              wrapperClassName,
            )}
            style={wrapperStyle}
            onMouseEnter={() => inputProps.value && setClearIconVisible(true)}
            onMouseLeave={() => setClearIconVisible(false)}
          >
            {prefixIcon && prefixIcon}
            <input
              {...rest}
              {...inputProps}
              className={classNames(
                isRtl ? "picker-input-fa" : "picker-input-en",
                isRtl && "rtl",
                className,
              )}
              onChange={onChangeInputValue}
            />
            <Suffix
              suffixIcon={suffixIcon}
              clearable={clearIconVisible}
              onClear={() => onEmptyInputValue()}
            />
          </div>
        </Popup>
      )}
    </DateProvider>
  );
};
