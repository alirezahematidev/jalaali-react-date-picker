import { useDatepicker } from "../../core";
import { gregorianMonths, jalaaliMonths } from "../../core/constants/datasets";
import {
  renderHook,
  render,
  getByTestId,
  fireEvent,
} from "@testing-library/react";
import { Provider } from "../../core/context/index";
import { shallow } from "enzyme";
import React, { useState } from "react";

import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";

configure({ adapter: new Adapter() });

const ChangeLanguage = () => {
  const [lang, setLang] = useState("fa");

  const handleChangeLanguage = () => setLang("en");

  return (
    <div className="App">
      <p data-testid="language">{lang}</p>

      <button data-testid="onButton" onClick={handleChangeLanguage}>
        click
      </button>
    </div>
  );
};

describe("change language ", () => {
  test("click test", () => {
    const { container } = render(<ChangeLanguage />);
    const language = getByTestId(container, "language");
    const onButton = getByTestId(container, "onButton");
    fireEvent.click(onButton);
    expect(language.textContent).toBe("en");
  });
});

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
