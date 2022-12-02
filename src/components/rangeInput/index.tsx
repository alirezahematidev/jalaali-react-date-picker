import classNames from "classnames";
import { useState } from "react";
import calendar from "../../assets/icons/calendar.svg";
import { InputRangePickerProps, RangeProvider } from "../../core";
import "../../styles/index.scss";
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
              "picker-input-wrapper",
              isRtl && "rtl",
              wrapperClassName,
            )}
            style={wrapperStyle}
          >
            {prefixIcon && prefixIcon}
            {values.map((value, index) => (
              <input
                key={index}
                {...rest}
                value={value}
                className={classNames(
                  "picker-input",
                  isRtl && "rtl",
                  className,
                )}
                readOnly
              />
            ))}
            {suffixIcon || (
              <div className="calendar-icon">
                <img src={calendar} alt="calendar" width={20} height={20} />
              </div>
            )}
          </div>
        </Popup>
      )}
    </RangeProvider>
  );
};
