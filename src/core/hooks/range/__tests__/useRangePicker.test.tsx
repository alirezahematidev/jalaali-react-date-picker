import { renderHook } from "@testing-library/react-hooks";
import moment from "moment-jalaali";
import { ReactNode } from "react";
import { RangeProvider, useRangepicker } from "../../..";

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

describe("useRangepicker", () => {
  const { result } = renderHook(() => useRangepicker(), {
    wrapper,
  });

  it("checks for jalaali", () => {
    expect(result.current.isJalaali).toBeTruthy();
  });
});
