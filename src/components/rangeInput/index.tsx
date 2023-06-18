import classNames from "classnames";
import { forwardRef, useEffect, useRef, useState } from "react";
import { InputRangePickerProps, RangeProvider, useSetColors } from "../../core";
import Popup from "../popup";
import RangePanel from "../range/rangePanel";
import { Suffix } from "../suffix";
import { Input } from "./input";

const InputRangePicker = forwardRef<HTMLInputElement, InputRangePickerProps>(
  (inputRangePickerProps, ref) => {
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
      rangeProps,
      disabled,
      suffixIcon,
      prefixIcon,
      placement,
      wrapperClassName,
      wrapperStyle,
      defaultValue,
      customColors,
      getPopupContainer,
      separator,
      responsive = "auto",
      error,
      placeholder,
      presets = true,
      onClear: inputOnClear,
      ...rest
    } = inputRangePickerProps;
    const isRtl = (locale || "fa") === "fa";

    useSetColors(customColors);

    const inputRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState<boolean | undefined>(open);

    useEffect(() => {
      if (open !== undefined) {
        open ? onOpen() : onClose();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const [animate, setAnimate] = useState(false);

    const [clearIconVisible, setClearIconVisible] = useState(false);

    const toggleAnimate = (animate: boolean) => {
      setAnimate(animate);
    };

    const onClose = () => {
      setIsOpen(open === undefined ? false : open);
      // toggleAnimate(open === undefined ? false : open);
      onOpenChange?.(false);
    };

    const onOpen = () => {
      if (disabled) return;
      setIsOpen(open === undefined ? true : open);
      toggleAnimate(open === undefined ? true : open);
      onOpenChange?.(true);
    };

    return (
      <RangeProvider
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
        {({
          values,
          onChangeInputRange,
          placeholderFrom,
          placeholderTo,
          onClear,
          isJalaali,
        }) => (
          <Popup
            key="range-popup"
            mode="range"
            placement={placement}
            isOpen={isOpen}
            close={onClose}
            animate={animate}
            toggleAnimate={toggleAnimate}
            inputRef={inputRef}
            getContainer={getPopupContainer}
            responsive={responsive}
            isJalaali={isJalaali}
            panel={(shouldResponsive) => (
              <RangePanel
                shouldResponsive={shouldResponsive}
                responsive={responsive}
                presets={presets}
                onClose={() => {}}
                {...rangeProps}
              />
            )}
          >
            <div
              className={classNames(
                "range-input-wrapper",
                error && "picker-input-error",
                disabled && "picker-input-disabled",
                isRtl && "rtl",
                wrapperClassName,
              )}
              ref={inputRef}
              style={wrapperStyle}
              onClick={onOpen}
              onMouseEnter={() => values[0] && setClearIconVisible(true)}
              onMouseLeave={() => setClearIconVisible(false)}
            >
              {prefixIcon && prefixIcon}
              <Input
                value={values?.[0]}
                firstInput
                ref={ref}
                isRtl={isRtl}
                disabled={disabled}
                separator={separator}
                {...rest}
                onChange={(e) => onChangeInputRange?.(e, true)}
                placeholder={
                  placeholderFrom || (placeholder ? placeholder[0] : undefined)
                }
              />
              <Input
                value={values?.[1]}
                isRtl={isRtl}
                ref={ref}
                disabled={disabled}
                {...rest}
                onChange={(e) => onChangeInputRange?.(e, false)}
                placeholder={
                  placeholderTo || (placeholder ? placeholder[1] : undefined)
                }
              />

              <Suffix
                suffixIcon={suffixIcon}
                clearable={clearIconVisible}
                onClear={onClear}
                inputOnClear={inputOnClear}
                error={error}
              />
            </div>
          </Popup>
        )}
      </RangeProvider>
    );
  },
);

const InputRangePickerWithRef = InputRangePicker as (
  inputRangePickerProps: InputRangePickerProps,
) => JSX.Element;

export { InputRangePickerWithRef as InputRangePicker };
