import React, {
  ChangeEvent,
  createContext,
  useContext,
  useEffect,
} from "react";
import { dateTransformer, formatGenerator, isEqual } from "../../../utils";
import { RangePickerProps } from "../../interfaces";
import { Date, RangeDate, RangeValue } from "../../types/global.types";
import { RangePropsReducerType } from "../propsReducer";
import { useRangePropsReducer } from "../usePropsReducer";
import { useRangeReducer } from "./useRangeReducer";

interface RangeInputProps {
  values: [string, string];
  onChangeInputRange?: (
    e: ChangeEvent<HTMLInputElement>,
    isStartDate: boolean,
  ) => void;
  placeholderFrom: string;
  placeholderTo: string;
  onClear?: () => void;
  isJalaali?: boolean;
}
interface ContextType extends RangePropsReducerType {
  rangeState: RangeDate;
  cacheRangeDate?: RangeDate;
  dateRange: RangeValue | null;
  onRangeDateChange: (payload: RangeDate) => void;
  onRangeDaychange: (payload: Date, isStartDate: boolean) => void;
  onRangeMonthchange: (month: number, mode: "from" | "to") => void;
  onRangeYearchange: (year: number, mode: "from" | "to") => void;
  onRangeIncreaseYear: () => void;
  onRangeDecreaseYear: () => void;
  onRangeIncreaseMonth: () => void;
  onRangeDecreaseMonth: () => void;
  changePlaceholder: (date: Date | null) => void;
  from: Date;
  to: Date;
  offsets: [number, number];
  setOffsets: (offsets: [number, number]) => void;
}

export const RangePickerContext = createContext<ContextType>({
  rangeState: {
    startDate: { day: 0, month: 0, year: 0 },
    endDate: null,
  },
  cacheRangeDate: undefined,
  locale: "fa",
  dateRange: null,
  onRangeDateChange: () => null,
  onRangeDaychange: () => null,
  onRangeMonthchange: () => null,
  onRangeYearchange: () => null,
  onRangeIncreaseYear: () => null,
  onRangeDecreaseYear: () => null,
  onRangeIncreaseMonth: () => null,
  onRangeDecreaseMonth: () => null,
  changePlaceholder: () => null,
  from: { day: 0, month: 0, year: 0 },
  to: { day: 0, month: 0, year: 0 },
  offsets: [0, 0],
  setOffsets: () => null,
});

interface RangeProviderProps {
  children: React.ReactNode | ((props: RangeInputProps) => React.ReactNode);
  props: RangePickerProps;
}

export const RangeProvider = ({ children, props }: RangeProviderProps) => {
  const language = props ? props.locale || "fa" : "fa";
  const { setLocale, setRangeDisabledDates, propsState, setFormat } =
    useRangePropsReducer();
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
    dateRange,
    changePlaceholder,
    offsets,
    setOffsets,
  } = useRangeReducer({
    language,
    onDayChangeProp: props?.onDayChange,
    onMonthChangeProp: props?.onMonthChange,
    onYearChangeProp: props?.onYearChange,
    onChangeProp: props.onChange,
    formatProp: propsState.format,
    valueProp: props.value,
    defaultValueProp: props.defaultValue,
  });

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
          ? props.format([
              dateTransformer(cacheRangeDate.startDate, language === "fa"),
              dateTransformer(
                cacheRangeDate.endDate ?? cacheRangeDate.startDate,
                language === "fa",
              ),
            ])
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
        changePlaceholder,
        from,
        to,
        rangeState,
        dateRange,
        offsets,
        setOffsets,
        ...propsState,
      }}
    >
      {typeof children === "function" ? children(inputRangeProps) : children}
    </RangePickerContext.Provider>
  );
};

export const useRangePickerContext = () => {
  if (typeof RangePickerContext === "undefined") {
    console.error(
      "useRangePickerContext must be under RangePickerContext Provider",
    );
  }

  return useContext(RangePickerContext);
};
