import { renderHook } from "@testing-library/react";
import moment from "moment-jalaali";
import { ReactNode } from "react";
import { RangeProvider, useRangeDays } from "../../..";

function wrapper({ children }: { children: ReactNode }) {
  return (
    <RangeProvider
      props={{
        locale: { language: "fa" },
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
  test("test useRangeDays", async () => {
    const {
      result: {
        current: { days },
      },
    } = renderHook(() => useRangeDays("from"), { wrapper });

    expect(days).toHaveLength(42);
    expect(
      days.some(({ isNotCurrentMonth }) => isNotCurrentMonth),
    ).toBeTruthy();
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
