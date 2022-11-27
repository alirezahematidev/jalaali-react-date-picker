import classNames from "classnames";
import { useRef, useState } from "react";
import arrowBack from "../../assets/icons/arrow_back.svg";
import arrowForward from "../../assets/icons/arrow_forward.svg";

import {
  InputRangePickerProps,
  RangeProvider,
  useRangepicker,
} from "../../core";
import { dateTransformer } from "../../utils";

const RangeInput = ({
  prefixIcon,
  suffixIcon,
  ...props
}: InputRangePickerProps) => {
  const [open, setopen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { rangeState, format, isJalaali } = useRangepicker();

  return (
    <>
      <div ref={ref} className={classNames("range_input_wrapper")}>
        <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          {prefixIcon && prefixIcon}
          <input
            value={
              rangeState.endDate
                ? dateTransformer(rangeState.endDate, isJalaali).format(
                    format || "",
                  )
                : ""
            }
            className={classNames(isJalaali ? "input_fa" : "input_en")}
            // onClick={() => setopen(true)}
            // onBlur={() => setopen(false)}
          />
        </div>
        <div className="range-icon">
          <img
            src={isJalaali ? arrowBack : arrowForward}
            alt="calendar"
            width={20}
            height={20}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
          {suffixIcon && suffixIcon}
          <input
            value={
              rangeState.startDate.day
                ? dateTransformer(rangeState.startDate, isJalaali).format(
                    format || "",
                  )
                : ""
            }
            className={classNames(isJalaali ? "input_fa" : "input_en")}
            // onClick={() => setopen(true)}
            // onBlur={() => setopen(false)}
          />
        </div>
      </div>
      {/* <button onClick={() => setopen(false)}>close</button> */}
    </>
  );
};

export { Provider as RangeInput };

const Provider = (props: InputRangePickerProps) => {
  return (
    <RangeProvider
      props={{
        value: props.value,
        defaultValue: props.defaultValue,
        onChange: props.onChange,
        onDayChange: props.onDayChange,
        onMonthChange: props.onMonthChange,
        onYearChange: props.onYearChange,
        format: props.format,
        locale: props.locale,
        disabledDates: props.disabledDates,
      }}
    >
      <RangeInput {...props} />
    </RangeProvider>
  );
};
