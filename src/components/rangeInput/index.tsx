import classNames from "classnames";
import { useState } from "react";
import { InputRangePickerProps, RangeProvider } from "../../core";
import { Popup } from "../popup";
import RangePanel from "../range/rangePanel";
import { Suffix } from "../suffix";
import { Input } from "./input";

export const GAP = 34;

type InputSize = Record<number, number>;

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
    placement = "bottom",
    wrapperClassName,
    wrapperStyle,
    defaultValue,
    ...rest
  } = inputRangePickerProps;
  const [isOpen, setIsOpen] = useState<boolean | undefined>(open);
  const isRtl = (locale || "fa") === "fa";
  const [inputSizes, setInputSizes] = useState<InputSize>({ 0: 0, 1: 0 });
  const [focusedInput, setFocusedInput] = useState<number>(-1);

  const onFocus = (index: number) => {
    setFocusedInput(index);
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
  const [clearIconVisible, setClearIconVisible] = useState(false);

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
          panel={<RangePanel toggle={toggle} {...rangeProps} />}
          shouldClose={false}
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
            {focusedInput !== -1 && (
              <div
                className="input-border-ink"
                style={{
                  right: isRtl
                    ? focusedInput === 0
                      ? 8
                      : inputSizes[0] + GAP + 4
                    : 0,
                  left: isRtl
                    ? 0
                    : focusedInput === 0
                    ? 8
                    : inputSizes[0] + GAP + 4,
                  width: Math.ceil(inputSizes[focusedInput]),
                }}
              />
            )}
            {prefixIcon && prefixIcon}
            <Input
              value={values?.[0]}
              index={0}
              isRtl={isRtl}
              onFocus={() => onFocus(0)}
              onBlur={() => setFocusedInput(-1)}
              onLayout={(width) =>
                setInputSizes((prev) => ({ ...prev, [0]: width + 4 }))
              }
              {...rest}
              onChange={(e) => onChangeInputRange?.(e, true)}
              className={classNames("picker-input", isRtl && "rtl")}
              placeholder={placeholderFrom}
            />
            <Input
              value={values?.[1]}
              index={1}
              isRtl={isRtl}
              onFocus={() => onFocus(1)}
              onBlur={() => setFocusedInput(-1)}
              onLayout={(width) =>
                setInputSizes((prev) => ({ ...prev, [1]: width + 4 }))
              }
              {...rest}
              onChange={(e) => onChangeInputRange?.(e, false)}
              className={classNames("picker-input", isRtl && "rtl")}
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
