import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { InputTimePickerProps } from "../../core";
import { Popup } from "../popup";
import { Suffix } from "../suffix";
import { TimePicker } from "../time";

export const InputTimePicker = (inputTimePickerProps: InputTimePickerProps) => {
  const {
    value,
    defaultValue,
    locale,
    onChange,
    onHourChange,
    onMinuteChange,
    onModeChange,
    format,
    minTime,
    maxTime,
    use12Hours,
    minutesStep,
    hoursStep,
    showNow,
    style,
    className,
    onClose,
    closeOnSelect,
    open,
    disabled,
    error,
    placement,
    onOpenChange,
    onClear,
    prefixIcon,
    suffixIcon,
    ...rest
  } = inputTimePickerProps;

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
    <>
      <Popup
        key="time-popup"
        mode="time"
        placement={placement}
        isOpen={isOpen}
        close={close}
        animate={animate}
        toggleAnimate={toggleAnimate}
        inputRef={inputRef}
        isJalaali={true}
        panel={() => <TimePicker />}
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
          )}
          onClick={onOpen}
          onTouchStart={onOpen}
          onMouseEnter={() => value && setClearIconVisible(true)}
          onMouseLeave={() => setClearIconVisible(false)}
        >
          {prefixIcon && prefixIcon}

          <input
            {...rest}
            // value={value}
            // placeholder={placeholder || inputPlaceholder}
            className={classNames(
              isRtl ? "picker-input-fa" : "picker-input-en",
              disabled && "picker-input-disabled",
              className,
            )}
            disabled={disabled}
            // onChange={onChangeInputValue}
          />
          <Suffix
            suffixIcon={suffixIcon}
            clearable={clearIconVisible}
            onClear={onClear}
            error={error}
          />
        </div>
      </Popup>
    </>
  );
};
