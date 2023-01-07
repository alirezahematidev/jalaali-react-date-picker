import classNames from "classnames";
import { useRef, useState } from "react";
import Panel from "../../components/date/panel";
import { DateProvider, InputDatePickerProps, useSetColors } from "../../core";
import { Popup } from "../popup";
import { Suffix } from "../suffix";

export const InputDatePicker = (inputDatePickerProps: InputDatePickerProps) => {
  const {
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
    placement,
    className,
    wrapperClassName,
    wrapperStyle,
    defaultValue,
    customColors,
    getPopupContainer,
    error,
    ...rest
  } = inputDatePickerProps;

  useSetColors(customColors);

  const inputRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean | undefined>(open);

  const [animate, setAnimate] = useState(false);

  const [clearIconVisible, setClearIconVisible] = useState(false);

  const isRtl = (locale || "fa") === "fa";

  const toggleAnimate = (animate: boolean) => {
    setAnimate(animate);
  };

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

  const onOpen = () => {
    const toggling = toggle();
    if (!toggling) return;

    toggleAnimate(true);
  };

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
        defaultValue,
      }}
    >
      {({ onChangeInputValue, onClear, isJalaali, ...inputProps }) => (
        <Popup
          key="date-popup"
          mode="date"
          placement={placement}
          isOpen={isOpen}
          close={close}
          getContainer={getPopupContainer}
          animate={animate}
          toggleAnimate={toggleAnimate}
          inputRef={inputRef}
          panel={() => <Panel toggle={toggle} {...pickerProps} />}
          isJalaali={isJalaali}
        >
          <div
            dir={isRtl ? "rtl" : "ltr"}
            ref={inputRef}
            aria-label="datepicker"
            className={classNames(
              "picker-input-wrapper",
              error && "picker-input-error",
              disabled && "picker-input-disabled",
              isRtl && "rtl",
              wrapperClassName,
            )}
            style={wrapperStyle}
            onClick={onOpen}
            onMouseEnter={() => inputProps.value && setClearIconVisible(true)}
            onMouseLeave={() => setClearIconVisible(false)}
          >
            {prefixIcon && prefixIcon}
            <input
              {...rest}
              {...inputProps}
              className={classNames(
                isRtl ? "picker-input-fa" : "picker-input-en",
                disabled && "picker-input-disabled",
                className,
              )}
              disabled={disabled}
              onChange={onChangeInputValue}
            />
            <Suffix
              suffixIcon={suffixIcon}
              clearable={clearIconVisible}
              onClear={onClear}
              error={error}
            />
          </div>
        </Popup>
      )}
    </DateProvider>
  );
};
