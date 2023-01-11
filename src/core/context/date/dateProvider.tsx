import moment from "moment-jalaali";
import { createContext, useContext, useEffect } from "react";
import { dateTransformer, formatGenerator, isEqual } from "../../../utils";
import { DatePickerProps } from "../../interfaces";
import { Date } from "../../types/global.types";
import { DatePropsReducerType } from "../propsReducer";
import { useDatePropsReducer } from "../usePropsReducer";
import { useDateReducer } from "./useDateReducer";

interface DateInputProps {
  value: string;
  placeholder?: string;
  onChangeInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  isJalaali?: boolean;
}

interface ContextType extends DatePropsReducerType {
  state: Date;
  cacheDate?: Date;
  onDateChange: (payload: Date) => void;
  onDaychange: (payload: Date) => void;
  onMonthchange: (payload: Date) => void;
  onYearchange: (payload: Date) => void;
  onIncreaseYear: (payload: Date) => void;
  onDecreaseYear: (payload: Date) => void;
  onIncreaseMonth: (payload: Date) => void;
  onDecreaseMonth: (payload: Date) => void;
  changePlaceholder: (payload: Date | null) => void;
  onClear: () => void;
  offset: number;
  setOffset: (offset: number) => void;
}

export const DatePickerContext = createContext<ContextType>({
  state: {
    day: 0,
    month: 0,
    year: 0,
  },
  cacheDate: undefined,
  locale: "fa",
  changePlaceholder: () => null,
  onDateChange: () => null,
  onDaychange: () => null,
  onMonthchange: () => null,
  onYearchange: () => null,
  onIncreaseYear: () => null,
  onDecreaseYear: () => null,
  onIncreaseMonth: () => null,
  onDecreaseMonth: () => null,
  setOffset: () => null,
  onClear: () => null,
  offset: 0,
});

interface DateProviderProps {
  props: DatePickerProps;
  children: React.ReactNode | ((props: DateInputProps) => React.ReactNode);
}

export const DateProvider = ({ children, props }: DateProviderProps) => {
  const language = props ? props.locale || "fa" : "fa";
  const { setLocale, setFormat, setDisabledDates, propsState } =
    useDatePropsReducer();
  const {
    state,
    onDaychange,
    onDateChange,
    onMonthchange,
    onYearchange,
    onIncreaseYear,
    onDecreaseYear,
    onIncreaseMonth,
    onDecreaseMonth,
    changePlaceholder,
    onClear,
    cacheDate,
    inputProps,
    offset,
    setOffset,
  } = useDateReducer({
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
      const isJalaali = props.locale === "fa";
      setLocale(props.locale);
      onDaychange({
        day: 0,
        year: isJalaali ? moment().jYear() : moment().year(),
        month: Number(moment().format(isJalaali ? "jM" : "M")),
      });
    }
    if (
      props.disabledDates?.length &&
      !isEqual(props.disabledDates, propsState.disabledDates)
    ) {
      setDisabledDates(props.disabledDates);
    }
    if (
      props.format !== propsState.format ||
      (props.format === undefined && propsState.format === undefined)
    ) {
      const format = props.format
        ? typeof props.format === "function"
          ? props.format(dateTransformer(cacheDate, props.locale === "fa"))
          : props.format
        : formatGenerator(language === "fa");

      setFormat(format);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <DatePickerContext.Provider
      value={{
        state,
        onDateChange,
        onDaychange,
        onMonthchange,
        onYearchange,
        onIncreaseYear,
        onDecreaseYear,
        onIncreaseMonth,
        onDecreaseMonth,
        changePlaceholder,
        onClear,
        cacheDate,
        format: propsState.format,
        offset,
        setOffset,
        ...propsState,
      }}
    >
      {typeof children === "function" ? children(inputProps) : children}
    </DatePickerContext.Provider>
  );
};

export const useDatePickerContext = () => {
  if (typeof DatePickerContext === "undefined") {
    console.error(
      "useDatePickerContext must be under DatePickerContext Provider",
    );
  }

  return useContext(DatePickerContext);
};
