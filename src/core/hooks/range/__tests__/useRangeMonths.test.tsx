import { renderHook } from "@testing-library/react-hooks";
import moment from "moment-jalaali";
import { ReactNode } from "react";
import { RangeProvider, useRangeMonths } from "../../..";

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

describe("useRangeMonths from", () => {
  const {
    result: {
      current: { months },
    },
  } = renderHook(() => useRangeMonths("from"), { wrapper });
  it("months should have length of 12", () => {
    expect(months).toHaveLength(12);
  });
  it("check language", () => {
    expect(months[0].name).toBe("فروردین");
  });
  it("previous month should be disabled", () => {
    const prevMonthId = moment().subtract(1, "months").jMonth() + 1;
    expect(
      months.find((item) => item.id === prevMonthId)?.isDisabled,
    ).toBeTruthy();
  });
});
