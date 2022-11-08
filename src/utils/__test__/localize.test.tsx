import { useDatepicker } from "../../core";
import { gregorianMonths, jalaaliMonths } from "../../core/constants/datasets";
import { renderHook } from "@testing-library/react";
import { Provider } from "../../core/context/index";

describe("locaize test", () => {
  const { result } = renderHook(() => useDatepicker(), {
    wrapper({ children }) {
      return (
        <Provider props={{ locale: { language: "fa" } }}>{children}</Provider>
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
