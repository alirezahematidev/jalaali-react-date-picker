import { renderHook } from "@testing-library/react";
import moment from "moment-jalaali";
import { ReactNode } from "react";
import { RangeProvider, useRangepicker } from "../../..";

function wrapper({ children }: { children: ReactNode }) {
  return (
    <RangeProvider
      props={{
        locale: { language: "fa" },
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

describe("useRangepicker", () => {
  const { result } = renderHook(() => useRangepicker(), {
    wrapper,
  });

  it("checks for jalaali", () => {
    expect(result.current.isJalaali).toBeTruthy();
  });
  it("checks for jalaali", () => {
    expect(result.current.format).toBe("jDD/jMM/jYYYY");
  });
});
