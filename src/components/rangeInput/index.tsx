import classNames from "classnames";
import React, { useRef, useState } from "react";
import { InputRangePickerProps, RangeProvider, useSetColors } from "../../core";
import { Popup } from "../popup";
import RangePanel from "../range/rangePanel";
import { Suffix } from "../suffix";
import { Input } from "./input";

export const InputRangePicker = (
  inputRangePickerProps: InputRangePickerProps,
) => {
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
    getContainer,
    seperator,
    responsive = "auto",
    error,
    ...rest
  } = inputRangePickerProps;
  const isRtl = (locale || "fa") === "fa";

  useSetColors(customColors);

  const inputRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean | undefined>(open);

  const [animate, setAnimate] = useState(false);

  const [clearIconVisible, setClearIconVisible] = useState(false);

  const toggleAnimate = (animate: boolean) => {
    setAnimate(animate);
  };

  const onClose = () => {
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const onOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    event.stopPropagation();

    setIsOpen(true);
    toggleAnimate(true);
    onOpenChange?.(isOpen === undefined ? false : isOpen);
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
          getContainer={getContainer}
          responsive={responsive}
          panel={(shouldResponsive) => (
            <RangePanel
              shouldResponsive={shouldResponsive}
              responsive={responsive}
              onClose={onClose}
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
            /** @todo StartDate insted values[0] */
            onMouseEnter={() => values[0] && setClearIconVisible(true)}
            onMouseLeave={() => setClearIconVisible(false)}
          >
            {prefixIcon && prefixIcon}
            <Input
              value={values?.[0]}
              firstInput
              isRtl={isRtl}
              disabled={disabled}
              seperator={seperator}
              {...rest}
              onChange={(e) => onChangeInputRange?.(e, true)}
              placeholder={placeholderFrom}
            />
            <Input
              value={values?.[1]}
              isRtl={isRtl}
              disabled={disabled}
              {...rest}
              onChange={(e) => onChangeInputRange?.(e, false)}
              placeholder={placeholderTo}
            />

            <Suffix
              suffixIcon={suffixIcon}
              clearable={clearIconVisible}
              onClear={onClear}
            />
          </div>
        </Popup>
      )}
    </RangeProvider>
  );
};
