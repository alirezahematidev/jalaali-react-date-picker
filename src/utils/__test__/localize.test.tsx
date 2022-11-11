import { useDatepicker } from "../../core";
import { gregorianMonths, jalaaliMonths } from "../../core/constants/datasets";
import { renderHook } from "@testing-library/react";
import { DateProvider } from "../../core/context";

describe("locaize test", () => {
  const { result } = renderHook(() => useDatepicker(), {
    wrapper({ children }) {
      return (
        <DateProvider props={{ locale: { language: "fa" } }}>
          {children}
        </DateProvider>
      );
    },
  });

  const isJalaali = result.current.language === "fa";

  it("isJalali test", () => {
    const english = gregorianMonths;
    const persian = jalaaliMonths;
    const data = isJalaali ? persian : english;
    expect(data).toStrictEqual(persian);
  });
});
