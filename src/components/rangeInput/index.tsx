import classNames from "classnames";
import { useState } from "react";
import { InputRangePickerProps, RangeProvider } from "../../core";
import { Popup } from "../popup";
import RangePanel from "../range/rangePanel";
import { Suffix } from "../suffix";
import { Input } from "./input";

export const GAP = 34;

type InputSize = Record<number, number>;

export const InputRangePicker = ({
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
  ...rest
}: InputRangePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(open);
  const [inputSizes, setInputSizes] = useState<InputSize>({ 0: 0, 1: 0 });
  const [focusedInput, setFocusedInput] = useState<number>(-1);

  const onFocus = (index: number) => {
    setFocusedInput(index);
  };

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
      }}
    >
      {({ values }) => (
        <Popup
          key="range-popup"
          mode="range"
          placement={placement}
          isOpen={isOpen}
          close={close}
          toggle={toggle}
          panel={<RangePanel {...rangeProps} />}
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
            {values.map((value, index) => (
              <Input
                key={index}
                value={value}
                index={index}
                isRtl={isRtl}
                onFocus={() => onFocus(index)}
                onLayout={(width) =>
                  setInputSizes((prev) => ({ ...prev, [index]: width + 4 }))
                }
                {...rest}
              />
            ))}
            <Suffix
              suffixIcon={suffixIcon}
              clearable={clearIconVisible}
              onClear={() => {}}
            />
          </div>
        </Popup>
      )}
    </RangeProvider>
  );
};
