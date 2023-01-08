import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import Panel from "../../components/date/panel";
import { DateProvider, InputDatePickerProps, useSetColors } from "../../core";
import { Popup } from "../popup";
import { Suffix } from "../suffix";
import { CustomWrapper } from "./customWrapper";

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
    renderInput,
    placeholder: inputPlaceholder,
    onClear: inputOnClear,
    ...rest
  } = inputDatePickerProps;

  useSetColors(customColors);

  const inputRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean | undefined>(open);

  useEffect(() => {
    if (open !== undefined) {
      open ? onOpen() : close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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
    setIsOpen(open === undefined ? false : open);
    onOpenChange?.(false);
  };

  const onOpen = () => {
    const toggling = toggle();
    if (!toggling) return;

    setIsOpen(open === undefined ? true : open);
    toggleAnimate(open === undefined ? true : open);
    onOpenChange?.(true);
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
      {({ onChangeInputValue, onClear, isJalaali, value, placeholder }) => (
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
          panel={() => <Panel {...pickerProps} />}
          isJalaali={isJalaali}
        >
          {renderInput ? (
            <CustomWrapper inputRef={inputRef} onOpen={onOpen}>
              {renderInput({
                isJalaali,
                onChange: onChangeInputValue,
                onClear,
                value,
                placeholder,
              })}
            </CustomWrapper>
          ) : (
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
              onTouchStart={onOpen}
              onMouseEnter={() => value && setClearIconVisible(true)}
              onMouseLeave={() => setClearIconVisible(false)}
            >
              {prefixIcon && prefixIcon}

              <input
                {...rest}
                value={value}
                placeholder={placeholder || inputPlaceholder}
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
                inputOnClear={inputOnClear}
                onClear={onClear}
                error={error}
              />
            </div>
          )}
        </Popup>
      )}
    </DateProvider>
  );
};
