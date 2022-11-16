import { isEqual } from "lodash-es";
import { createContext, useContext } from "react";
import { useDeepCompareEffect } from "../../hooks";
import { RangePickerProps } from "../../interfaces";
import { Date, RangeDate } from "../../types/global.types";
import { RangePropsReducerType } from "../propsReducer";
import { useRangePropsReducer } from "../usePropsReducer";
import { useRangeReducer } from "./useRangeReducer";

interface ContextType extends RangePropsReducerType {
  rangeState: RangeDate;
  cacheRangeDate?: RangeDate;
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

export const RangeProvider = ({
  children,
  props,
}: {
  children: React.ReactNode;
  props: RangePickerProps;
}) => {
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

  const { setLocale, setRangeDisabledDates, propsState } =
    useRangePropsReducer();

  useDeepCompareEffect(() => {
    if (props.locale && !isEqual(props.locale, propsState.locale)) {
      const isJalaali = language === "fa";
      setLocale(props.locale);
      // onRangeDaychange({
      //   startDate: {
      //     day: 0,
      //     year: isJalaali ? moment().jYear() : moment().year(),
      //     month: Number(moment().format(isJalaali ? "jM" : "M")),
      //   },
      //   endDate: {
      //     day: 0,
      //     year: isJalaali ? moment().jYear() : moment().year(),
      //     month: Number(
      //       moment()
      //         .add(1, "month")
      //         .format(isJalaali ? "jM" : "M"),
      //     ),
      //   },
      // });
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
        ...propsState,
      }}
    >
      {children}
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
