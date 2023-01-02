import classNames from "classnames";
import { useState } from "react";
import { InputRangePickerProps, RangeProvider } from "../../core";
import { Icon } from "../icon";
import { Popup } from "../popup";
import RangePanel from "../range/rangePanel";

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
  className,
  wrapperClassName,
  wrapperStyle,
  ...rest
}: InputRangePickerProps) => {
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
      {({ values, onChangeInputRange, placeholderFrom, placeholderTo }) => (
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
              "picker-input-wrapper",
              isRtl && "rtl",
              wrapperClassName,
            )}
            style={wrapperStyle}
          >
            {prefixIcon && prefixIcon}
            <input
              {...rest}
              value={values?.[0]}
              onChange={(e) => onChangeInputRange?.(e, true)}
              className={classNames("picker-input", isRtl && "rtl", className)}
              placeholder={placeholderFrom}
            />
            <input
              {...rest}
              value={values?.[1]}
              onChange={(e) => onChangeInputRange?.(e, false)}
              className={classNames("picker-input", isRtl && "rtl", className)}
              placeholder={placeholderTo}
            />
            {suffixIcon || (
              <div className="calendar-icon">
                <Icon.Calendar />
              </div>
            )}
          </div>
        </Popup>
      )}
    </RangeProvider>
  );
};
