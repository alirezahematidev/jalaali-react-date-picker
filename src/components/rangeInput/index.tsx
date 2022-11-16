import classNames from "classnames";
import React from "react";
import arrowForward from "../../assets/icons/arrow_forward.svg";

import {
  InputRangePickerProps,
  RangePickerProps,
  useRangepicker,
} from "../../core";
import { RangeProvider } from "../../core/context";

const RangeInput = ({
  defaultValue,
  disabledDates,
  format,

  locale,
  onChange,
  onDayChange,
  onMonthChange,
  onYearChange,
  value,
  ...rest
}: InputRangePickerProps) => {
  const { value: v } = useRangepicker();
  return (
    <RangeProvider
      props={{
        value,
        disabledDates,
        format,
        locale,
        onChange,
        onDayChange,
        onMonthChange,
        onYearChange,
      }}
    >
      <div className={classNames("range_input_wrapper")}>
        <input className={classNames("range_input_from")} {...rest} />
        <div className="range-icon">
          <img src={arrowForward} alt="calendar" width={20} height={20} />
        </div>
        <input className={classNames("range_input_to")} {...rest} />
      </div>
    </RangeProvider>
  );
};

export { RangeInput };
