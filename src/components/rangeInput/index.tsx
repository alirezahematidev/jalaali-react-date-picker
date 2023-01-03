import classNames from "classnames";
import { useState } from "react";
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
    ...rest
  } = inputRangePickerProps;

  useSetColors(customColors);

  const [isOpen, setIsOpen] = useState<boolean | undefined>(open);
  const [clearIconVisible, setClearIconVisible] = useState(false);

  const isRtl = (locale || "fa") === "fa";

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
          close={close}
          toggle={toggle}
          getContainer={getContainer}
          panel={<RangePanel toggle={toggle} {...rangeProps} />}
        >
          <div
            className={classNames(
              "range-input-wrapper",
              isRtl && "rtl",
              wrapperClassName,
            )}
            style={wrapperStyle}
            /** @todo StartDate insted values[0] */
            onMouseEnter={() => values[0] && setClearIconVisible(true)}
            onMouseLeave={() => setClearIconVisible(false)}
          >
            {prefixIcon && prefixIcon}
            <Input
              value={values?.[0]}
              firstInput
              isRtl={isRtl}
              seperator={seperator}
              {...rest}
              onChange={(e) => onChangeInputRange?.(e, true)}
              className={classNames(
                isRtl ? "picker-input-fa" : "picker-input-en",
              )}
              placeholder={placeholderFrom}
            />
            <Input
              value={values?.[1]}
              isRtl={isRtl}
              {...rest}
              onChange={(e) => onChangeInputRange?.(e, false)}
              className={classNames(
                isRtl ? "picker-input-fa" : "picker-input-en",
              )}
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
