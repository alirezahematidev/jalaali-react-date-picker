import { renderHook } from "@testing-library/react-hooks";
import moment from "moment-jalaali";
import { ReactNode } from "react";
import { RangeProvider, useRangeDays } from "../../..";
import { dateTransformer } from "../../../../utils";

function wrapper({ children }: { children: ReactNode }) {
  return (
    <RangeProvider
      props={{
        locale: "fa",
        disabledDates: (current) => {
          return current.isBefore(moment());
        },
      }}
    >
      {children}
    </RangeProvider>
  );
}

describe("useRangeDays from", () => {
  const {
    result: {
      current: { days },
    },
  } = renderHook(() => useRangeDays("from"), { wrapper });
  it("days should have length of 42", () => {
    expect(days).toHaveLength(42);
  });
  it("checks not current month", () => {
    expect(
      days.some(({ isNotCurrentMonth }) => isNotCurrentMonth),
    ).toBeTruthy();
  });

  it("checks for disabled dates", () => {
    const item = days.find(({ isDisabled }) => isDisabled);
    if (!item) return;
    const res = dateTransformer(
      {
        day: item.day,
        month: item.month,
        year: item.year,
      },
      true,
    ).isBefore(moment(), "day");
    expect(res).toBeTruthy();
  });
});
describe("useRangeDays to", () => {
  test("test useRangeDays", async () => {
    const {
      result: {
        current: { days },
      },
    } = renderHook(() => useRangeDays("to"), { wrapper });

    expect(days).toHaveLength(42);
    expect(
      days.some(({ isNotCurrentMonth }) => isNotCurrentMonth),
    ).toBeTruthy();
  });
});
