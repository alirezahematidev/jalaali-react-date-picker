import { act, renderHook } from "@testing-library/react";
import moment from "moment-jalaali";
import { ReactNode } from "react";
import { DateProvider, useDatepicker } from "../../..";
import { momentTransformer } from "../../../../utils";

function wrapper({ children }: { children: ReactNode }) {
  return (
    <DateProvider
      props={{
        locale: { language: "fa" },
      }}
    >
      {children}
    </DateProvider>
  );
}

describe("useYears", () => {
  test("test useYears", async () => {
    const { result } = renderHook(() => useDatepicker(), { wrapper });
    act(() => {
      result.current.goToToday();
    }),
      expect(result.current.isJalaali).toBeTruthy();
    expect(result.current.dayLabels[0]).toBe("ش");
    expect(result.current.language).toBe("fa");
    expect(result.current.format).toBe("jYYYY-jMM-jDD");
    expect(momentTransformer(moment())).toStrictEqual(result.current.state);
    expect(momentTransformer(moment())).toStrictEqual(result.current.cacheDate);
  });
});
