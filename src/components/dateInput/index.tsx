import classNames from "classnames";
import { useState } from "react";
import calendar from "../../assets/icons/calendar_today.svg";
import { InputDatePickerProps } from "../../core";
import { DateProvider } from "../../core/context";
import "../../styles/index.scss";

export const InputDatePicker = ({
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
  ...rest
}: InputDatePickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(open);
  const isRtl = (locale?.language || "fa") === "fa";

  const onFocus = () => {
    if (disabled) return;

    setIsOpen(true);
    onOpenChange?.(true);
  };

  const onBlur = () => {
    if (disabled) return;

    setIsOpen(false);
    onOpenChange?.(false);
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
      }}
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
          className={classNames("picker-input", isRtl && "rtl", className)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {suffixIcon || (
          <div className="calendar-icon">
            <img src={calendar} alt="calendar" width={20} height={20} />
          </div>
        )}
      </div>
    </DateProvider>
  );
};
