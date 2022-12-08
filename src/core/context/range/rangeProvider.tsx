import { isEqual } from "lodash-es";
import React, { createContext, useContext, useEffect } from "react";
import { formatGenerator, rangeTransformer } from "../../../utils";
import { RangePickerProps } from "../../interfaces";
import { Date, RangeDate, RangeValue } from "../../types/global.types";
import { RangePropsReducerType } from "../propsReducer";
import { useRangePropsReducer } from "../usePropsReducer";
import { useRangeReducer } from "./useRangeReducer";

interface RangeInputProps {
  values: [string, string];
}
interface ContextType extends RangePropsReducerType {
  rangeState: RangeDate;
  cacheRangeDate?: RangeDate;
  rangeDateString: RangeValue | null;
  onRangeDateChange: (payload: RangeDate) => void;
  onRangeDaychange: (payload: Date, isStartDate: boolean) => void;
  onRangeMonthchange: (month: number, mode: "from" | "to") => void;
  onRangeYearchange: (year: number, mode: "from" | "to") => void;
  onRangeIncreaseYear: () => void;
  onRangeDecreaseYear: () => void;
  onRangeIncreaseMonth: () => void;
  onRangeDecreaseMonth: () => void;
  from: Date;
  to: Date;
}

export const RangePickerContext = createContext<ContextType>({
  rangeState: {
    startDate: { day: 0, month: 0, year: 0 },
    endDate: null,
  },
  cacheRangeDate: undefined,
  locale: {
    language: "fa",
  },
  rangeDateString: null,
  onRangeDateChange: () => null,
  onRangeDaychange: () => null,
  onRangeMonthchange: () => null,
  onRangeYearchange: () => null,
  onRangeIncreaseYear: () => null,
  onRangeDecreaseYear: () => null,
  onRangeIncreaseMonth: () => null,
  onRangeDecreaseMonth: () => null,
  from: { day: 0, month: 0, year: 0 },
  to: { day: 0, month: 0, year: 0 },
});

interface RangeProviderProps {
  children: React.ReactNode | ((props: RangeInputProps) => React.ReactNode);
  props: RangePickerProps;
}

export const RangeProvider = ({ children, props }: RangeProviderProps) => {
  const language = props ? props.locale?.language || "fa" : "fa";

  const {
    cacheRangeDate,
    onRangeDateChange,
    onRangeDaychange,
    onRangeDecreaseMonth,
    onRangeDecreaseYear,
    onRangeIncreaseMonth,
    onRangeIncreaseYear,
    onRangeMonthchange,
    onRangeYearchange,
    rangeState,
    from,
    to,
    inputRangeProps,
    rangeDateString,
  } = useRangeReducer({
    language,
    onDayChangeProp: props?.onDayChange,
    onMonthChangeProp: props?.onMonthChange,
    onYearChangeProp: props?.onYearChange,
    onChangeProp: props.onChange,
    formatProp: props.format,
    valueProp: props.value,
    defaultValueProp: props.defaultValue,
  });

  const { setLocale, setRangeDisabledDates, propsState, setFormat } =
    useRangePropsReducer();

  useEffect(() => {
    if (props.locale && !isEqual(props.locale, propsState.locale)) {
      setLocale(props.locale);
    }
    if (
      props.format !== propsState.format ||
      (props.format === undefined && propsState.format === undefined)
    ) {
      const format = props.format
        ? typeof props.format === "function"
          ? props.format(rangeTransformer(cacheRangeDate))
          : props.format
        : formatGenerator(language === "fa");
      setFormat(format);
    }
    if (
      props.disabledDates?.length &&
      !isEqual(props.disabledDates, propsState.disabledDates)
    ) {
      setRangeDisabledDates(props.disabledDates);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <RangePickerContext.Provider
      value={{
        cacheRangeDate,
        onRangeDateChange,
        onRangeDaychange,
        onRangeDecreaseMonth,
        onRangeDecreaseYear,
        onRangeIncreaseMonth,
        onRangeIncreaseYear,
        onRangeMonthchange,
        onRangeYearchange,
        from,
        to,
        rangeState,
        rangeDateString,
        ...propsState,
      }}
    >
      {typeof children === "function" ? children(inputRangeProps) : children}
    </RangePickerContext.Provider>
  );
};

export const useRangePickerContext = () => {
  if (typeof RangePickerContext === "undefined") {
    throw new Error(
      "useRangePickerContext must be under RangePickerContext Provider",
    );
  }

  return useContext(RangePickerContext);
};
