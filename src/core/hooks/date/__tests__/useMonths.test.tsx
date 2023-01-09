import { renderHook } from "@testing-library/react-hooks";
import moment from "moment-jalaali";
import { ReactNode } from "react";
import { DateProvider, useMonths, useRangepicker } from "../../..";
import { gregorianMonths, jalaaliMonths } from "../../../constants/datasets";

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

describe("useMonths", () => {
  test("test useMonths", async () => {
    const {
      result: {
        current: { isJalaali },
      },
    } = renderHook(() => useRangepicker(), { wrapper });

    const {
      result: {
        current: { months },
      },
    } = renderHook(() => useMonths(), { wrapper });

    expect(months).toHaveLength(12);
    expect(months[0].name).toBe(
      isJalaali ? jalaaliMonths[0].name : gregorianMonths[0].name,
    );
    expect(months[0].name).toBe(
      isJalaali ? jalaaliMonths[0].name : gregorianMonths[0].name,
    );
    const prevMonth = Number(moment().subtract(1, "months").jMonth());
    expect(months[prevMonth].isDisabled).toBeTruthy();
  });
});
