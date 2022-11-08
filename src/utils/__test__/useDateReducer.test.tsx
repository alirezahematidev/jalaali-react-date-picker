import { renderHook, act } from "@testing-library/react";
import { useDateReducer } from "../../core/context/useDateReducer";
import { Provider } from "../../core/context/index";

describe("onDaychange", () => {
  test("test useReducer", async () => {
    const { result } = renderHook(() => useDateReducer({ language: "fa" }), {
      wrapper({ children }) {
        return (
          <Provider props={{ locale: { language: "fa" } }}>{children}</Provider>
        );
      },
    });
    act(() => result.current.onDaychange({ day: 5, month: 7, year: 1401 }));

    expect(result.current.cacheDate).toStrictEqual({
      day: 5,
      month: 7,
      year: 1401,
    });
  });
});

describe("onDecreaseMonth", () => {
  test("test useReducer", async () => {
    const { result } = renderHook(() => useDateReducer({ language: "fa" }), {
      wrapper({ children }) {
        return (
          <Provider props={{ locale: { language: "fa" } }}>{children}</Provider>
        );
      },
    });
    act(() => result.current.onDecreaseMonth({ day: 0, month: 8, year: 1401 }));
    expect(result.current.state).toStrictEqual({
      day: 0,
      month: 7,
      year: 1401,
    });
  });
});

describe("onIncreaseMonth", () => {
  test("test useReducer", async () => {
    const { result } = renderHook(() => useDateReducer({ language: "fa" }), {
      wrapper({ children }) {
        return (
          <Provider props={{ locale: { language: "fa" } }}>{children}</Provider>
        );
      },
    });
    act(() => result.current.onIncreaseMonth({ day: 0, month: 4, year: 1401 })),
      expect(result.current.state).toStrictEqual({
        day: 0,
        month: 5,
        year: 1401,
      });
  });
});
describe("onYearchange", () => {
  test("test useReducer", async () => {
    const { result } = renderHook(() => useDateReducer({ language: "fa" }), {
      wrapper({ children }) {
        return (
          <Provider props={{ locale: { language: "fa" } }}>{children}</Provider>
        );
      },
    });
    act(() => result.current.onYearchange({ day: 0, month: 0, year: 1401 }));

    expect(result.current.state).toStrictEqual({
      day: 0,
      month: 8,
      year: 1401,
    });
  });
});
describe("onMonthchange", () => {
  test("test useReducer", async () => {
    const { result } = renderHook(() => useDateReducer({ language: "fa" }), {
      wrapper({ children }) {
        return (
          <Provider props={{ locale: { language: "fa" } }}>{children}</Provider>
        );
      },
    });
    act(() => result.current.onMonthchange({ day: 0, month: 8, year: 1401 }));

    expect(result.current.state).toStrictEqual({
      day: 0,
      month: 8,
      year: 1401,
    });
  });
});
describe("onIncreaseYear", () => {
  test("test useReducer", async () => {
    const { result } = renderHook(() => useDateReducer({ language: "fa" }), {
      wrapper({ children }) {
        return (
          <Provider props={{ locale: { language: "fa" } }}>{children}</Provider>
        );
      },
    });
    act(() => result.current.onIncreaseYear({ day: 1, month: 7, year: 1401 }));
    expect(result.current.state).toStrictEqual({
      day: 0,
      month: 8,
      year: 1402,
    });
  });
});
describe("onDecreaseYear", () => {
  test("test useReducer", async () => {
    const { result } = renderHook(() => useDateReducer({ language: "fa" }), {
      wrapper({ children }) {
        return (
          <Provider props={{ locale: { language: "fa" } }}>{children}</Provider>
        );
      },
    });
    act(() => result.current.onDecreaseYear({ day: 1, month: 9, year: 1401 }));
    expect(result.current.state).toStrictEqual({
      day: 0,
      month: 8,
      year: 1400,
    });
  });
});
