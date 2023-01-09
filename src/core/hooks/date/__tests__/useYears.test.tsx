import { renderHook } from "@testing-library/react-hooks";
import moment from "moment-jalaali";
import { ReactNode } from "react";
import { DateProvider, useYears } from "../../..";

function wrapper({ children }: { children: ReactNode }) {
  return (
    <DateProvider
      props={{
        locale: "fa",
        disabledDates: (current) => {
          return current.isBefore(moment());
        },
      }}
    >
      {children}
    </DateProvider>
  );
}

describe("useYears", () => {
  test("test useYears", async () => {
    const {
      result: {
        current: { years },
      },
    } = renderHook(() => useYears(0), { wrapper });

    const {
      result: {
        current: { years: lastDecade },
      },
    } = renderHook(() => useYears(-10), { wrapper });
    const {
      result: {
        current: { years: nextDecade },
      },
    } = renderHook(() => useYears(10), { wrapper });

    expect(years).toHaveLength(12);
    expect(years[0].isNotCurrentDecade).toBeTruthy();
    expect(years[years.length - 1].isNotCurrentDecade).toBeTruthy();
    expect(lastDecade.every((year) => year.isDisabled)).toBeTruthy();
    expect(nextDecade.every((year) => year.isDisabled)).toBeFalsy();
  });
});
