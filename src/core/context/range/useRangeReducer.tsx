import moment, { Moment } from "moment-jalaali";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import {
  dateTransformer,
  formatGenerator,
  getCurrentMonth,
  getCurrentYear,
  getDateDay,
  getDateMonth,
  getDateYear,
  getMonthLabels,
  momentTransformer,
  rangeTransformer,
} from "../../../utils";
import { RangePickerProps } from "../../interfaces";
import { Date, Locale, RangeDate, RangeValue } from "../../types/global.types";
import { RangeActionKind, rangeReducer } from "./rangeReducer";

interface RangeDateReducerType {
  formatProp?: string;
  onChangeProp?: RangePickerProps["onChange"];
  valueProp?: RangePickerProps["value"];
  defaultValueProp?: RangePickerProps["defaultValue"];
  onDayChangeProp?: RangePickerProps["onDayChange"];
  onMonthChangeProp?: RangePickerProps["onMonthChange"];
  onYearChangeProp?: RangePickerProps["onYearChange"];
  locale: Locale;
}

type Offsets = [number, number];

type RangeInput = [string, string];

type FromTo = {
  from: Date;
  to: Date;
};

/** Function that returns the default date range. */
const getDefaultValue = (value?: RangeValue, isJalaali = true): RangeDate => {
  let defaultDate = {
    startDate: {
      day: 0,
      year: getCurrentYear(isJalaali),
      month: getCurrentMonth(isJalaali),
    },
    endDate: null,
  };

  if (value && value.length) {
    defaultDate = {
      startDate: {
        day: 0,
        year: getDateYear(value[0], isJalaali),
        month: getDateMonth(value[0], isJalaali),
      },
      endDate: null,
    };
  }

  return defaultDate;
};

export const useRangeReducer = ({
  formatProp,
  valueProp,
  defaultValueProp,
  onChangeProp,
  onDayChangeProp,
  onMonthChangeProp,
  onYearChangeProp,
  locale,
}: RangeDateReducerType) => {
  const isJalaali = locale === "fa";
  const [offsets, setOffset] = useState<Offsets>([0, 0]);
  const [rangeInputValue, setRangeInputValue] = useState<RangeInput>(["", ""]);

  const fromAndToDefaultValue = useMemo(() => {
    const currentYear = getCurrentYear(isJalaali);
    const currentMonth = getCurrentMonth(isJalaali);
    const from = {
      day: 0,
      year: currentYear,
      month: currentMonth,
    };
    const to = {
      day: 0,
      year: currentMonth === 12 ? currentYear + 1 : currentYear,
      month: currentMonth === 12 ? 1 : currentMonth + 1,
    };
    return {
      from,
      to,
    };
  }, [isJalaali]);

  const [fromAndTo, setFromAndTo] = useState<FromTo>(fromAndToDefaultValue);

  /** State to hold the cached date range. */
  const [cacheRangeDate, setCacheRangeDate] = useState<RangeDate>(
    getDefaultValue(defaultValueProp, isJalaali),
  );

  /** State and Dispatch hook for managing the date range. */
  const [rangeState, dispatch] = useReducer(
    rangeReducer,
    getDefaultValue(defaultValueProp, isJalaali),
  );

  /** State to hold the placeholder text. */
  const [placeholderFrom, setPlaceholderFrom] = useState<string>("");

  /** State to hold the placeholder text. */
  const [placeholderTo, setPlaceholderTo] = useState<string>("");

  const formattedDates = useCallback(
    (dates: [Moment, Moment | null] | null) => {
      return dates?.map((date) => {
        if (date) {
          return date.format(
            formatProp ? formatProp : formatGenerator(isJalaali),
          );
        }
        return "";
      }) as RangeInput;
    },
    [formatProp, isJalaali],
  );

  const { dateRange } = useMemo(() => {
    let dateRange = null;

    if (
      rangeState.startDate.day !== 0 &&
      rangeState.endDate?.day !== 0 &&
      rangeState.endDate !== null
    ) {
      dateRange = rangeTransformer(rangeState, isJalaali);
    }

    return { dateRange };
  }, [isJalaali, rangeState]);

  useEffect(() => {
    const year = getCurrentYear(isJalaali);
    setOffset([
      (rangeState.startDate.day === 0 ? year : rangeState.startDate.year) -
        year,
      (rangeState.endDate?.year || year) - year,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isJalaali, rangeInputValue]);

  /**
   * UseEffect hook that updates the cached date and input value when the
   * valueProp changes.
   */
  useEffect(() => {
    if (!valueProp) {
      onClear();
    }
    if (valueProp && valueProp.length) {
      const startDate = {
        day: getDateDay(valueProp[0], isJalaali),
        year: getDateYear(valueProp[0], isJalaali),
        month: getDateMonth(valueProp[0], isJalaali),
      };

      let endDate = null;

      if (valueProp?.[1] !== null) {
        endDate = {
          day: getDateDay(valueProp[1], isJalaali),
          year: getDateYear(valueProp[1], isJalaali),
          month: getDateMonth(valueProp[1], isJalaali),
        };
      }

      const values: RangeDate = { startDate, endDate };

      setCacheRangeDate(values);

      const inputRangeVal = formattedDates([
        dateTransformer(values.startDate, isJalaali),
        values.endDate ? dateTransformer(values.endDate, isJalaali) : null,
      ]);

      setRangeInputValue(inputRangeVal);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueProp, formatProp]);

  /**
   * UseEffect hook that updates the cached date and input value when the
   * defaultValueProp changes.
   */
  useEffect(() => {
    if (defaultValueProp && !valueProp) {
      const startDate = {
        day: getDateDay(defaultValueProp[0], isJalaali),
        year: getDateYear(defaultValueProp[0], isJalaali),
        month: getDateMonth(defaultValueProp[0], isJalaali),
      };

      let endDate = null;

      if (defaultValueProp?.[1] !== null) {
        endDate = {
          day: getDateDay(defaultValueProp[1], isJalaali),
          year: getDateYear(defaultValueProp[1], isJalaali),
          month: getDateMonth(defaultValueProp[1], isJalaali),
        };
      }

      const values: RangeDate = {
        startDate,
        endDate,
      };

      setCacheRangeDate(values);

      const inputRangeVal = formattedDates([
        dateTransformer(values.startDate, isJalaali),
        values.endDate ? dateTransformer(values.endDate, isJalaali) : null,
      ]);

      setRangeInputValue(inputRangeVal);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValueProp, valueProp, formatProp]);

  useEffect(() => {
    setFromAndTo(fromAndToDefaultValue);
  }, [fromAndToDefaultValue, isJalaali]);

  /**
   * This function is a callback function that updates the selected date range
   * and dispatches an action.
   */
  const onRangeDateChange = useCallback(
    (payload: RangeDate | null) => {
      if (payload === null) {
        setRangeInputValue(["", ""]);

        setPlaceholderFrom("");

        setPlaceholderTo("");

        setCacheRangeDate((prev) => ({
          startDate: { ...prev.startDate, day: 0 },
          endDate: null,
        }));

        dispatch({
          type: RangeActionKind.DATE,
          payload: {
            startDate: { ...rangeState.startDate, day: 0 },
            endDate: null,
          },
        });

        return;
      }
      dispatch({ type: RangeActionKind.DATE, payload });

      setCacheRangeDate(payload);

      if (payload.endDate) {
        const dates = rangeTransformer({ ...payload }, isJalaali);

        if (payload.startDate.day !== 0 && payload.endDate.day !== 0) {
          onChangeProp?.(dates, formattedDates(dates));
        }

        setRangeInputValue([
          dates?.[0] ? dates[0].format(formatProp) : "",
          dates?.[1] ? dates[1].format(formatProp) : "",
        ]);
      }
    },
    [formatProp, formattedDates, isJalaali, onChangeProp, rangeState.startDate],
  );

  /** Callback function that updates the selected day range and dispatches an action. */
  const onRangeDaychange = useCallback(
    (payload: Date, isStartDate: boolean) => {
      const isValidRange = rangeState.startDate && rangeState.endDate;

      if (
        (!isStartDate &&
          dateTransformer(payload, isJalaali).isBefore(
            dateTransformer(rangeState.startDate, isJalaali),
            "day",
          )) ||
        isValidRange
      ) {
        const res: RangeDate = {
          startDate: payload,
          endDate: null,
        };

        dispatch({ type: RangeActionKind.DAY, payload: res });

        setCacheRangeDate(res);

        setPlaceholderTo("");

        setRangeInputValue([
          dateTransformer(res.startDate, isJalaali).format(formatProp),
          "",
        ]);

        return;
      }
      const res: RangeDate = {
        startDate: isStartDate ? payload : rangeState.startDate,
        endDate: !isStartDate ? payload : rangeState.endDate,
      };

      dispatch({ type: RangeActionKind.DAY, payload: res });
      setCacheRangeDate(res);

      if (!res) return;

      if (
        res.startDate.day !== 0 &&
        res?.endDate?.day !== 0 &&
        res.endDate !== null
      ) {
        onDayChangeProp?.([res.startDate.day, res.endDate.day]);
      }

      setRangeInputValue([
        dateTransformer(res.startDate, isJalaali).format(formatProp),
        "",
      ]);
      onRangeDateChange?.(res);
    },
    [
      isJalaali,
      rangeState.startDate,
      rangeState.endDate,
      onRangeDateChange,
      onDayChangeProp,
      formatProp,
    ],
  );

  /** Callback function that updates the selected month range and dispatches an action. */
  const onRangeMonthchange = useCallback(
    (month: number, mode: "from" | "to") => {
      setFromAndTo(({ from, to }) => {
        const isToNextYear = to.year > from.year;
        const updatedFrom = {
          ...from,
          ...(mode === "from" && { month }),
        };

        const updatedTo = { ...to };

        if (mode === "to") {
          updatedTo.month = month;
        } else {
          if (isToNextYear) {
            updatedTo.month = to.month;
          } else if (month === 12) {
            updatedTo.month = 1;
          } else if (to.month <= month) {
            updatedTo.month = month + 1;
          } else {
            updatedTo.month = to.month;
          }
        }

        if (isToNextYear) {
          updatedTo.year = to.year;
        } else if (month === 12 && mode === "from") {
          updatedTo.year = to.year + 1;
        } else {
          updatedTo.year = to.year;
        }

        onMonthChangeProp?.([
          {
            name: getMonthLabels(updatedFrom.month, isJalaali),
            value: updatedFrom.month,
          },
          {
            name: getMonthLabels(updatedTo.month, isJalaali),
            value: updatedTo.month,
          },
        ]);
        return {
          from: updatedFrom,
          to: updatedTo,
        };
      });
    },
    [isJalaali, onMonthChangeProp],
  );

  /** Callback function that updates the selected year range and dispatches an action. */
  const onRangeYearchange = useCallback(
    (year: number, mode: "from" | "to") => {
      setFromAndTo(({ from, to }) => {
        const updatedFrom: Date = {
          ...from,
          ...(mode === "from" && { year }),
        };

        const updatedTo = { ...to };

        if (mode === "to") {
          updatedTo.year = year;
        } else {
          updatedTo.year = to.year < year ? year : to.year;
        }

        onYearChangeProp?.([updatedFrom.year, updatedTo.year]);

        return {
          from: updatedFrom,
          to: updatedTo,
        };
      });
    },
    [onYearChangeProp],
  );

  /** Callback function that increases the selected year range and dispatches an action. */
  const onRangeIncreaseYear = useCallback(() => {
    setFromAndTo(({ from, to }) => {
      const updatedFrom: Date = {
        ...from,
        year: from.year + 1,
      };
      const updatedTo: Date = {
        ...to,
        year: to.year + 1,
      };
      onYearChangeProp?.([updatedFrom.year, updatedTo.year]);

      return {
        from: updatedFrom,
        to: updatedTo,
      };
    });
  }, [onYearChangeProp]);

  /** Callback function that decreases the selected year range and dispatches an action. */
  const onRangeDecreaseYear = useCallback(() => {
    setFromAndTo(({ from, to }) => {
      const updatedFrom: Date = {
        ...from,
        year: from.year - 1,
      };
      const updatedTo: Date = {
        ...to,
        year: to.year - 1,
      };
      onYearChangeProp?.([updatedFrom.year, updatedTo.year]);

      return {
        from: updatedFrom,
        to: updatedTo,
      };
    });
  }, [onYearChangeProp]);

  /** Callback function that increases the selected month range and dispatches an action. */
  const onRangeIncreaseMonth = useCallback(() => {
    setFromAndTo(({ from, to }) => {
      if (to.month === 12) {
        const updatedFrom: Date = {
          ...from,
          month: from.month === 11 ? 12 : from.month + 1,
        };
        const updatedTo: Date = {
          ...to,
          month: 1,
          year: to.year + 1,
        };
        onMonthChangeProp?.([
          {
            name: getMonthLabels(updatedFrom.month, isJalaali),
            value: updatedFrom.month,
          },
          {
            name: getMonthLabels(updatedTo.month, isJalaali),
            value: updatedTo.month,
          },
        ]);
        return {
          from: updatedFrom,
          to: updatedTo,
        };
      }

      const updatedFrom: Date = {
        ...from,
        month: from.month === 12 ? 1 : from.month + 1,
        year: from.month === 12 ? from.year + 1 : from.year,
      };

      const updatedTo: Date = {
        ...to,
        month: to.month + 1,
      };

      onMonthChangeProp?.([
        {
          name: getMonthLabels(updatedFrom.month, isJalaali),
          value: updatedFrom.month,
        },
        {
          name: getMonthLabels(updatedTo.month, isJalaali),
          value: updatedTo.month,
        },
      ]);

      return {
        from: updatedFrom,
        to: updatedTo,
      };
    });
  }, [isJalaali, onMonthChangeProp]);

  /** Callback function that decreases the selected month range and dispatches an action. */
  const onRangeDecreaseMonth = useCallback(() => {
    setFromAndTo(({ from, to }) => {
      if (from.month === 1) {
        const updatedFrom: Date = {
          ...from,
          month: 12,
          year: from.year - 1,
        };
        const updatedTo: Date = {
          ...from,
          month: to.month - 1,
        };
        onMonthChangeProp?.([
          {
            name: getMonthLabels(updatedFrom.month, isJalaali),
            value: updatedFrom.month,
          },
          {
            name: getMonthLabels(updatedTo.month, isJalaali),
            value: updatedTo.month,
          },
        ]);
        return {
          from: updatedFrom,
          to: updatedTo,
        };
      }
      const updatedFrom = {
        ...from,
        month: from.month - 1,
      };
      const updatedTo = {
        ...to,
        month: to.month === 1 ? 12 : to.month - 1,
        year: to.month === 1 ? to.year - 1 : to.year,
      };

      onMonthChangeProp?.([
        {
          name: getMonthLabels(updatedFrom.month, isJalaali),
          value: updatedFrom.month,
        },
        {
          name: getMonthLabels(updatedTo.month, isJalaali),
          value: updatedTo.month,
        },
      ]);
      return {
        from: updatedFrom,
        to: updatedTo,
      };
    });
  }, [isJalaali, onMonthChangeProp]);

  /** This function is used to handle changes to the inputs field value. */
  const onChangeInputRange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isStartDate: boolean,
  ) => {
    const [rangeInputValueFrom, rangeInputValueTo] = rangeInputValue;

    const fromInputValue = isStartDate ? e.target.value : rangeInputValueFrom;

    const toInputValue = !isStartDate ? e.target.value : rangeInputValueTo;

    const momentValueFrom = moment(fromInputValue, formatProp, true);

    const momentValueTo = moment(toInputValue, formatProp, true);

    setRangeInputValue([fromInputValue, toInputValue]);

    if (isStartDate && momentValueFrom.isValid()) {
      if (momentValueFrom.isBefore(momentValueTo)) {
        const startDate = momentTransformer(momentValueFrom, isJalaali);
        const endDate = momentTransformer(momentValueTo, isJalaali);
        if (
          startDate.month === endDate.month &&
          startDate.year === endDate.year
        ) {
          const to = { ...endDate };

          if (endDate.month === 12) {
            to.month = 1;
            to.year = endDate.year + 1;
          } else {
            to.month = endDate.month + 1;
            to.year = endDate.year;
          }

          setFromAndTo({
            from: startDate,
            to,
          });
        } else {
          setFromAndTo({ from: startDate, to: endDate });
        }
        onRangeDateChange({
          startDate: momentTransformer(momentValueFrom, isJalaali),
          endDate: momentTransformer(momentValueTo, isJalaali),
        });
      } else {
        const startDate = momentTransformer(momentValueFrom, isJalaali);

        const to = { ...startDate };

        if (startDate.month === 12) {
          to.month = 1;
          to.year = startDate.year + 1;
        } else {
          to.month = startDate.month + 1;
          to.year = startDate.year;
        }

        setFromAndTo({
          from: startDate,
          to,
        });

        setRangeInputValue([fromInputValue, ""]);

        onRangeDateChange({
          startDate: momentTransformer(momentValueFrom, isJalaali),
          endDate: null,
        });
      }
    } else if (!isStartDate && momentValueTo.isValid()) {
      if (momentValueTo.isAfter(momentValueFrom)) {
        const startDate = momentTransformer(momentValueFrom, isJalaali);
        const endDate = momentTransformer(momentValueTo, isJalaali);
        if (
          startDate.month === endDate.month &&
          startDate.year === endDate.year
        ) {
          const from = { ...endDate };

          if (endDate.month === 1) {
            from.month = 12;
            from.year = endDate.year - 1;
          } else {
            from.month = endDate.month - 1;
            from.year = endDate.year;
          }

          setFromAndTo({
            from,
            to: endDate,
          });
        } else {
          setFromAndTo({ from: startDate, to: endDate });
        }

        onRangeDateChange({
          startDate: momentTransformer(momentValueFrom, isJalaali),
          endDate: momentTransformer(momentValueTo, isJalaali),
        });
        return;
      } else {
        const endDate = momentTransformer(momentValueTo, isJalaali);

        const to = { ...endDate };

        if (endDate.month === 12) {
          to.month = 1;
          to.year = endDate.year + 1;
        } else {
          to.month = endDate.month + 1;
          to.year = endDate.year;
        }

        setFromAndTo({
          from: endDate,
          to,
        });

        setRangeInputValue(["", ""]);

        setPlaceholderFrom("");

        setPlaceholderTo("");

        onRangeDateChange({
          startDate: { ...rangeState.startDate, day: 0 },
          endDate: null,
        });
      }
    }
  };

  /** Callback function that updates the placeholder text of the inputs field. */
  const changePlaceholder = useCallback(
    (date: Date | null) => {
      if (rangeState.startDate.day > 0 && rangeState.endDate !== null) {
        return;
      }
      if (!date) {
        if (rangeState.startDate.day === 0) {
          setPlaceholderFrom("");
        } else {
          setPlaceholderTo("");
        }
        return;
      }
      if (rangeState.startDate.day === 0) {
        setPlaceholderFrom(dateTransformer(date, isJalaali).format(formatProp));
      } else {
        setPlaceholderTo(dateTransformer(date, isJalaali).format(formatProp));
      }
    },
    [formatProp, isJalaali, rangeState],
  );

  const onClear = () => {
    setRangeInputValue(["", ""]);
    setPlaceholderFrom("");
    setPlaceholderTo("");
    onRangeDateChange(null);
    onChangeProp?.(null, ["", ""]);
  };

  const setOffsets = useCallback((offsets: [number, number]) => {
    setOffset(offsets);
  }, []);

  const changeFrom = (from: Partial<FromTo["from"]>) => {
    setFromAndTo((prev) => ({ to: prev.to, from: { ...prev.from, ...from } }));
  };
  const changeTo = (to: Partial<FromTo["to"]>) => {
    setFromAndTo((prev) => ({ from: prev.from, to: { ...prev.to, ...to } }));
  };

  return {
    rangeState,
    cacheRangeDate,
    onRangeDateChange,
    onRangeDaychange,
    onRangeMonthchange,
    onRangeYearchange,
    onRangeIncreaseYear,
    onRangeDecreaseYear,
    onRangeIncreaseMonth,
    onRangeDecreaseMonth,
    changeFrom,
    changeTo,
    dateRange,
    from: fromAndTo.from,
    to: fromAndTo.to,
    changePlaceholder,
    offsets,
    setOffsets,
    inputRangeProps: {
      values: rangeInputValue,
      onChangeInputRange,
      placeholderFrom,
      placeholderTo,
      onClear,
      isJalaali,
    },
  };
};
