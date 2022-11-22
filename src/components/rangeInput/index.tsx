import classNames from "classnames";
import { useRef } from "react";
import arrowForward from "../../assets/icons/arrow_forward.svg";

import { InputRangePickerProps, useRangepicker } from "../../core";
import { RangeProvider } from "../../core/context/range";
import { dateTransformer } from "../../utils";
import { useLayout } from "./useLayout";

const RangeInput = ({
  disabledDates,
  locale,
  onChange,
  onDayChange,
  onMonthChange,
  onYearChange,
  value,
  prefixIcon,
  suffixIcon,
  ...rest
}: InputRangePickerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const layout = useLayout(ref);

  console.log({ layout });

  const { rangeState, format } = useRangepicker();

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
      <div ref={ref} className={classNames("range_input_wrapper")}>
        <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          {prefixIcon && prefixIcon}
          <input
            value={dateTransformer(rangeState.startDate).format(format || "")}
            className={classNames("input")}
            {...rest}
          />
        </div>
        <div className="range-icon">
          <img src={arrowForward} alt="calendar" width={20} height={20} />
        </div>
        <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          {suffixIcon && suffixIcon}
          <input className={classNames("input")} {...rest} />
        </div>
      </div>
    </RangeProvider>
  );
};

export { RangeInput };
