import moment, { Moment } from "moment-jalaali";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import {
  dateTransformer,
  formatGenerator,
  getMonthLabels,
  momentTransformer,
  rangeTransformer,
} from "../../../utils";
import { RangePickerProps } from "../../interfaces";
import {
  Date,
  Language,
  RangeDate,
  RangeValue,
} from "../../types/global.types";
import { RangeActionKind, rangeReducer } from "./rangeReducer";

interface RangeDateReducerType {
  formatProp?: string;
  onChangeProp?: RangePickerProps["onChange"];
  valueProp?: RangePickerProps["value"];
  defaultValueProp?: RangePickerProps["value"];
  onDayChangeProp?: RangePickerProps["onDayChange"];
  onMonthChangeProp?: RangePickerProps["onMonthChange"];
  onYearChangeProp?: RangePickerProps["onYearChange"];
  language: Language;
}

const getDefaultValue = (value?: RangeValue, isJalaali = true): RangeDate => {
  if (value && value.length) {
    return {
      startDate: {
        day: 0,
        year: isJalaali ? value[0].jYear() : value[0].year(),
        month: Number(value[0].format(isJalaali ? "jM" : "M")),
      },
      endDate: null,
    };
  }

  return {
    startDate: {
      day: 0,
      year: isJalaali ? moment().jYear() : moment().year(),
      month: Number(moment().format(isJalaali ? "jM" : "M")),
    },
    endDate: null,
  };
};

export const useRangeReducer = ({
  formatProp,
  valueProp,
  defaultValueProp,
  onChangeProp,
  onDayChangeProp,
  onMonthChangeProp,
  onYearChangeProp,
  language,
}: RangeDateReducerType) => {
  const isJalaali = language === "fa";

  const [fromAndTo, setFromAndTo] = useState<{ from: Date; to: Date }>({
    from: {
      day: 0,
      year: isJalaali ? moment().jYear() : moment().year(),
      month: Number(moment().format(isJalaali ? "jM" : "M")),
    },
    to: {
      day: 0,
      year: isJalaali ? moment().jYear() : moment().year(),
      month: Number(
        moment()
          .add(1, "month")
          .format(isJalaali ? "jM" : "M"),
      ),
    },
  });
  const [cacheRangeDate, setCacheRangeDate] = useState<RangeDate>(
    getDefaultValue(defaultValueProp, isJalaali),
  );
  const [rangeState, dispatch] = useReducer(
    rangeReducer,
    getDefaultValue(defaultValueProp, isJalaali),
  );

  const [rangeInputValue, setRangeInputValue] = useState<[string, string]>([
    "",
    "",
  ]);
  const [placeholderFrom, setPlaceholderFrom] = useState<string>("");
  const [placeholderTo, setPlaceholderTo] = useState<string>("");

  const formattedDates = useCallback(
    (dates: [Moment, Moment | null]) => {
      return dates.map((date) =>
        date
          ? date.format(formatProp ? formatProp : formatGenerator(isJalaali))
          : "",
      ) as [string, string];
    },
    [formatProp, isJalaali],
  );

  const { dateRange } = useMemo(() => {
    const dateRange =
      rangeState.startDate.day !== 0 &&
      rangeState.endDate !== null &&
      rangeState.endDate?.day !== 0
        ? rangeTransformer(rangeState, isJalaali)
        : null;

    return { dateRange };
  }, [isJalaali, rangeState]);

  useEffect(() => {
    if (valueProp && valueProp.length) {
      const values: RangeDate = {
        startDate: {
          day: isJalaali ? valueProp[0].jDate() : valueProp[0].date(),
          year: isJalaali ? valueProp[0].jYear() : valueProp[0].year(),
          month: Number(valueProp[0].format(isJalaali ? "jM" : "M")),
        },
        endDate: {
          day: isJalaali ? valueProp[1].jDate() : valueProp[1].date(),
          year: isJalaali ? valueProp[1].jYear() : valueProp[1].year(),
          month: Number(valueProp[1].format(isJalaali ? "jM" : "M")),
        },
      };
      setCacheRangeDate(values);
      const inputRangeVal = formattedDates([
        dateTransformer(values.startDate, isJalaali),
        values.endDate ? dateTransformer(values.endDate, isJalaali) : null,
      ]);
      setRangeInputValue(inputRangeVal);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueProp]);
  useEffect(() => {
    if (defaultValueProp && !valueProp) {
      const values: RangeDate = {
        startDate: {
          day: isJalaali
            ? defaultValueProp[0].jDate()
            : defaultValueProp[0].date(),
          year: isJalaali
            ? defaultValueProp[0].jYear()
            : defaultValueProp[0].year(),
          month: Number(defaultValueProp[0].format(isJalaali ? "jM" : "M")),
        },
        endDate: {
          day: isJalaali
            ? defaultValueProp[1].jDate()
            : defaultValueProp[1].date(),
          year: isJalaali
            ? defaultValueProp[1].jYear()
            : defaultValueProp[1].year(),
          month: Number(defaultValueProp[1].format(isJalaali ? "jM" : "M")),
        },
      };
      setCacheRangeDate(values);
      const inputRangeVal = formattedDates([
        dateTransformer(values.startDate, isJalaali),
        values.endDate ? dateTransformer(values.endDate, isJalaali) : null,
      ]);
      setRangeInputValue(inputRangeVal);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValueProp, valueProp]);

  const onRangeDateChange = useCallback(
    (payload: RangeDate) => {
      dispatch({ type: RangeActionKind.DATE, payload });

      setCacheRangeDate(payload);

      if (payload.endDate) {
        const dates = rangeTransformer({ ...payload }, isJalaali);

        payload.startDate.day !== 0 &&
          payload.endDate.day !== 0 &&
          onChangeProp?.(dates, formattedDates(dates));
        setRangeInputValue([
          dates[0].format(formatProp),
          dates[1].format(formatProp),
        ]);
      }
    },
    [formatProp, formattedDates, isJalaali, onChangeProp],
  );
  const onRangeDaychange = useCallback(
    (payload: Date, isStartDate: boolean) => {
      if (
        (!isStartDate &&
          dateTransformer(payload, isJalaali).isBefore(
            dateTransformer(rangeState.startDate, isJalaali),
            "day",
          )) ||
        (rangeState.startDate && rangeState.endDate)
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

      if (res) {
        if (
          res.startDate.day !== 0 &&
          res.endDate !== null &&
          res?.endDate?.day !== 0
        ) {
          onDayChangeProp?.([res.startDate.day, res.endDate.day]);
        }
        setRangeInputValue([
          dateTransformer(res.startDate, isJalaali).format(formatProp),
          "",
        ]);
        onRangeDateChange?.(res);
      }
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

  const onRangeMonthchange = useCallback(
    (month: number, mode: "from" | "to") => {
      setFromAndTo(({ from, to }) => {
        const updatedFrom = {
          ...from,
          ...(mode === "from" && { month }),
        };

        const isToNextYear = to.year > from.year;
        const updatedTo = {
          ...to,
          ...(mode === "to"
            ? { month }
            : {
                month: isToNextYear
                  ? to.month
                  : month === 12
                  ? 1
                  : to.month <= month
                  ? month + 1
                  : to.month,
              }),
          year: isToNextYear
            ? to.year
            : month === 12 && mode === "from"
            ? to.year + 1
            : to.year,
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
    },
    [isJalaali, onMonthChangeProp],
  );
  const onRangeYearchange = useCallback(
    (year: number, mode: "from" | "to") => {
      setFromAndTo(({ from, to }) => {
        const updatedFrom: Date = {
          ...from,
          ...(mode === "from" && { year }),
        };
        const updatedTo: Date = {
          ...to,
          ...(mode === "to"
            ? { year }
            : { year: to.year < year ? year : to.year }),
        };
        onYearChangeProp?.([updatedFrom.year, updatedTo.year]);
        return {
          from: updatedFrom,
          to: updatedTo,
        };
      });
    },
    [onYearChangeProp],
  );
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
        month: from.month + 1 === 13 ? 1 : from.month + 1,
        year: from.month + 1 === 13 ? from.year + 1 : from.year,
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
        month: to.month - 1 === 0 ? 12 : to.month - 1,
        year: to.month - 1 === 0 ? to.year - 1 : to.year,
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

  const onChangeInputRange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isStartDate: boolean,
  ) => {
    const fromInput = e.target.value;
    const momentValue = moment(fromInput, formatProp, true);
    if (momentValue.isValid()) {
      if (isStartDate) {
        if (rangeState.endDate) {
          const endDate = dateTransformer(rangeState.endDate, isJalaali);
          if (momentValue.isBefore(endDate)) {
            const startDate = momentTransformer(momentValue, isJalaali);
            setRangeInputValue([
              momentValue.format(formatProp),
              endDate.format(formatProp),
            ]);
            onRangeDateChange({
              startDate,
              endDate: rangeState.endDate,
            });
          }
        }
      } else {
        const startDate = dateTransformer(rangeState.startDate, isJalaali);
        if (momentValue.isAfter(startDate)) {
          setRangeInputValue([
            startDate.format(formatProp),
            momentValue.format(formatProp),
          ]);
          onRangeDateChange({
            startDate: rangeState.startDate,
            endDate: momentTransformer(momentValue, isJalaali),
          });
        }
      }
    }
  };

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
    onRangeDateChange(getDefaultValue(undefined, isJalaali));
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
    dateRange,
    inputRangeProps: {
      values: rangeInputValue,
      onChangeInputRange,
      placeholderFrom,
      placeholderTo,
      onClear,
    },
    from: fromAndTo.from,
    to: fromAndTo.to,
    changePlaceholder,
  };
};
