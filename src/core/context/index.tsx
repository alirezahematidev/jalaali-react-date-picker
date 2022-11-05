import moment from "moment-jalaali";
import { createContext, useContext, useReducer, useState } from "react";
import { DateTransformer } from "../types/global.types";
import { ActionKind, reducer } from "./reducer";

interface ContextType {
  state: DateTransformer;
  cacheDate?: DateTransformer;
  onDaychange: (payload: DateTransformer) => void;
  onMonthchange: (payload: DateTransformer) => void;
  onYearchange: (payload: DateTransformer) => void;
  onIncreaseYear: (payload: DateTransformer) => void;
  onDecreaseYear: (payload: DateTransformer) => void;
  onIncreaseMonth: (payload: DateTransformer) => void;
  onDecreaseMonth: (payload: DateTransformer) => void;
}

const DatePickerContext = createContext<ContextType>({
  state: {
    day: 0,
    month: 0,
    year: 0,
  },
  cacheDate: undefined,
  onDaychange: () => null,
  onMonthchange: () => null,
  onYearchange: () => null,
  onIncreaseYear: () => null,
  onDecreaseYear: () => null,
  onIncreaseMonth: () => null,
  onDecreaseMonth: () => null,
});

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [cacheDate, setCacheDate] = useState<DateTransformer>();
  const [state, dispatch] = useReducer(reducer, {
    day: moment().jDate(),
    year: moment().jYear(),
    month: Number(moment().format("jM")),
  });

  console.log("cacheDate", cacheDate);

  const onDaychange = (payload: DateTransformer) => {
    console.log("payload", payload);
    dispatch({ type: ActionKind.DAY, payload });
    setCacheDate(payload);
  };
  const onMonthchange = (payload: DateTransformer) => {
    dispatch({ type: ActionKind.MONTH, payload });
  };
  const onYearchange = (payload: DateTransformer) => {
    dispatch({ type: ActionKind.YEAR, payload });
  };
  const onIncreaseYear = (payload: DateTransformer) => {
    dispatch({
      type: ActionKind.YEAR_PLUS,
      payload: {
        ...state,
        day: cacheDate?.year === payload.year ? cacheDate.day : 0,
      },
    });
  };
  const onDecreaseYear = (payload: DateTransformer) => {
    dispatch({
      type: ActionKind.YEAR_MINUS,
      payload: {
        ...state,
        day: cacheDate?.year === payload.year ? cacheDate.day : 0,
      },
    });
  };
  const onIncreaseMonth = (payload: DateTransformer) => {
    dispatch({
      type: ActionKind.MONTH_PLUS,
      payload: {
        ...state,
        day: cacheDate?.month === payload.month ? cacheDate.day : 0,
      },
    });
  };
  const onDecreaseMonth = (payload: DateTransformer) => {
    dispatch({
      type: ActionKind.MONTH_MINUS,
      payload: {
        ...state,
        day: cacheDate?.month === payload.month ? cacheDate.day : 0,
      },
    });
  };
  return (
    <DatePickerContext.Provider
      value={{
        state,
        onDaychange,
        onMonthchange,
        onYearchange,
        onIncreaseYear,
        onDecreaseYear,
        onIncreaseMonth,
        onDecreaseMonth,
        cacheDate,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

export const useDatePickerContext = () => {
  return useContext(DatePickerContext);
};
