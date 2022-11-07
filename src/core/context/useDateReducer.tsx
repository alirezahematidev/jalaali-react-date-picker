import moment from "moment-jalaali";
import { useState, useReducer } from "react";
import { Date } from "../types/global.types";
import { reducer, ActionKind } from "./dateReducer";

export const useDateReducer = () => {
  const [cacheDate, setCacheDate] = useState<Date>();
  const [state, dispatch] = useReducer(reducer, {
    day: 0,
    year: moment().jYear(),
    month: Number(moment().format("jM")),
  });

  const onDaychange = (payload: Date) => {
    dispatch({ type: ActionKind.DAY, payload });
    setCacheDate(payload);
  };
  const onMonthchange = (payload: Date) => {
    dispatch({ type: ActionKind.MONTH, payload });
  };
  const onYearchange = (payload: Date) => {
    dispatch({ type: ActionKind.YEAR, payload });
  };
  const onIncreaseYear = (payload: Date) => {
    dispatch({
      type: ActionKind.YEAR_PLUS,
      payload: {
        ...payload,
        day: cacheDate?.year === payload.year ? cacheDate.day : 0,
      },
    });
  };
  const onDecreaseYear = (payload: Date) => {
    dispatch({
      type: ActionKind.YEAR_MINUS,
      payload: {
        ...payload,
        day: cacheDate?.year === payload.year ? cacheDate.day : 0,
      },
    });
  };
  const onIncreaseMonth = (payload: Date) => {
    dispatch({
      type: ActionKind.MONTH_PLUS,
      payload: {
        ...payload,
        day: cacheDate?.month === payload.month ? cacheDate.day : 0,
      },
    });
  };
  const onDecreaseMonth = (payload: Date) => {
    dispatch({
      type: ActionKind.MONTH_MINUS,
      payload: {
        ...payload,
        day: cacheDate?.month === payload.month ? cacheDate.day : 0,
      },
    });
  };

  return {
    state,
    cacheDate,
    onDaychange,
    onMonthchange,
    onYearchange,
    onIncreaseYear,
    onDecreaseYear,
    onIncreaseMonth,
    onDecreaseMonth,
  };
};
