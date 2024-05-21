import { act, renderHook } from "@testing-library/react-hooks";
import moment from "moment-jalaali";
import { ReactNode } from "react";
import { RangeProvider, useRangePickerContext } from "../../..";

function wrapper({ children }: { children: ReactNode }) {
  return (
    <RangeProvider
      props={{
        locale: "fa",
        disabledDates: (current) => {
          return current.isBefore(moment());
        },
        format: "jDD/jMM/jYYYY",
      }}
    >
      {children}
    </RangeProvider>
  );
}

describe("useRangeYears", () => {
  it("checks for format", () => {
    const { result } = renderHook(() => useRangePickerContext(), {
      wrapper,
    });
    expect(result.current.format).toBe("jDD/jMM/jYYYY");
  });
  it("checks for language", () => {
    const { result } = renderHook(() => useRangePickerContext(), {
      wrapper,
    });
    expect(result.current.locale).toBe("fa");
  });
  it("checks for from and to months", () => {
    const { result } = renderHook(() => useRangePickerContext(), {
      wrapper,
    });
    const currentMonth = moment().jMonth() + 1;
    expect(result.current.from.month).toBe(currentMonth);
    expect(result.current.to.month).toBe(
      currentMonth === 12 ? 1 : currentMonth + 1,
    );
  });

  it("checks for on year change", () => {
    const { result } = renderHook(() => useRangePickerContext(), {
      wrapper,
    });
    act(() => result.current.onRangeYearchange(1402, "from"));
    act(() => result.current.onRangeYearchange(1406, "to"));
    expect(result.current.from.year).toBe(1402);
    expect(result.current.to.year).toBe(1406);
  });
  it("checks for on month change", () => {
    const { result } = renderHook(() => useRangePickerContext(), {
      wrapper,
    });
    act(() => result.current.onRangeMonthchange(8, "from"));
    act(() => result.current.onRangeMonthchange(12, "to"));
    expect(result.current.from.month).toBe(8);
    expect(result.current.to.month).toBe(12);
  });
  it("checks for on day change", () => {
    const { result } = renderHook(() => useRangePickerContext(), {
      wrapper,
    });
    act(() =>
      result.current.onRangeDaychange({ day: 4, month: 11, year: 1401 }, true),
    );

    expect(result.current.rangeState.startDate.day).toBe(4);
    expect(result.current.rangeState.startDate.month).toBe(11);
    expect(result.current.rangeState.startDate.year).toBe(1401);
    act(() =>
      result.current.onRangeDaychange(
        { day: 10, month: 11, year: 1401 },
        false,
      ),
    );

    expect(result.current.rangeState.endDate?.day).toBe(10);
    expect(result.current.rangeState.endDate?.month).toBe(11);
    expect(result.current.rangeState.endDate?.year).toBe(1401);
  });
  it("checks for on day change when selecting before startDate", () => {
    const { result } = renderHook(() => useRangePickerContext(), {
      wrapper,
    });
    act(() =>
      result.current.onRangeDaychange({ day: 4, month: 11, year: 1401 }, true),
    );

    act(() =>
      result.current.onRangeDaychange({ day: 3, month: 11, year: 1401 }, false),
    );

    expect(result.current.rangeState.startDate.day).toBe(3);
    expect(result.current.rangeState.startDate.month).toBe(11);
    expect(result.current.rangeState.startDate.year).toBe(1401);
    expect(result.current.rangeState.endDate).toBe(null);
  });

  it("checks for onRangeIncreaseMonth", () => {
    const { result } = renderHook(() => useRangePickerContext(), {
      wrapper,
    });
    act(() => result.current.onRangeIncreaseMonth());
    expect(result.current.from.month).toBe(
      moment().add(1, "jMonth").jMonth() + 1,
    );
    expect(result.current.to.month).toBe(
      moment().add(2, "jMonth").jMonth() + 1,
    );
  });
  it("checks for onRangeIncreaseMonth when the from month is the end of the year", () => {
    const { result } = renderHook(() => useRangePickerContext(), {
      wrapper,
    });
    act(() => result.current.onRangeMonthchange(11, "from"));
    act(() => result.current.onRangeMonthchange(12, "to"));
    act(() => result.current.onRangeIncreaseMonth());

    expect(result.current.from.month).toBe(12);
    expect(result.current.to.month).toBe(1);
  });
  it("checks for onRangeDecreaseMonth", () => {
    const { result } = renderHook(() => useRangePickerContext(), {
      wrapper,
    });

    act(() => result.current.onRangeMonthchange(6, "from"));
    act(() => result.current.onRangeMonthchange(7, "to"));
    act(() => result.current.onRangeDecreaseMonth());
    expect(result.current.from.month).toBe(5);
    expect(result.current.to.month).toBe(6);
  });
  it("checks for onRangeDecreaseMonth when the from month is the start of the year", () => {
    const { result } = renderHook(() => useRangePickerContext(), {
      wrapper,
    });
    act(() => result.current.onRangeMonthchange(1, "from"));
    act(() => result.current.onRangeMonthchange(2, "to"));
    act(() => result.current.onRangeDecreaseMonth());

    expect(result.current.from.month).toBe(12);
    expect(result.current.from.year).toBe(moment().jYear() - 1);
    expect(result.current.to.month).toBe(1);
  });
});
