import { renderHook } from "@testing-library/react-hooks";
import moment from "moment-jalaali";
import { ReactNode } from "react";
import { DateProvider, useDays } from "../../..";

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

describe("useDays", () => {
  test("test useDays", async () => {
    const {
      result: {
        current: { days },
      },
    } = renderHook(() => useDays(), { wrapper });

    expect(days).toHaveLength(42);
    expect(
      days.some(({ isNotCurrentMonth }) => isNotCurrentMonth),
    ).toBeTruthy();
    expect(days.filter((item) => item.isDisabled).slice(-1)[0].day).toBe(
      moment().jDate(),
    );
  });
});
