import { renderHook } from "@testing-library/react-hooks";
import moment from "moment-jalaali";
import { ReactNode } from "react";
import { RangeProvider, useRangeYears } from "../../..";

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

describe("useRangeYears", () => {
  const {
    result: {
      current: { years, lowerDecade, upperDecade },
    },
  } = renderHook(() => useRangeYears({ type: "from", offsets: [0, 0] }), {
    wrapper,
  });
  it("years should have length of 12", () => {
    expect(years).toHaveLength(12);
  });
  it("check current year", () => {
    expect(years.find((item) => item.id === moment().jYear())).toBeTruthy();
  });
  it("previous year should be disabled", () => {
    const prevYearId = moment().subtract(1, "years").jYear();
    expect(
      years.find((item) => item.id === prevYearId)?.isDisabled,
    ).toBeTruthy();
  });
  it("not current decade should be 2", () => {
    expect(years.filter((item) => item.isNotCurrentDecade)).toHaveLength(2);
  });
  it("checks for upperdecade and lowerdecade", () => {
    expect(upperDecade).toBeGreaterThan(moment().jYear());
    expect(lowerDecade).toBeLessThan(moment().jYear());
    expect(upperDecade).toBe(1409);
    expect(lowerDecade).toBe(1400);
  });
});
