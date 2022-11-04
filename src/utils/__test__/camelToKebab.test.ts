import { camelToKebab } from "../camelToKebab";

const camelToKebabTestCallback = () => {
  const fn = jest.fn(camelToKebab);

  expect(fn("textDark")).toBe("text-dark");
  expect(fn("textLightF")).toBe("text-light-f");
  expect(fn("onPrimary")).toBe("on-primary");
  expect(fn("text")).toBe("text");
  expect(fn("text-light")).toBe("text-light");
  expect(fn("BackgroundDisabled")).toBe("background-disabled");
};

test("camel to kebab string", camelToKebabTestCallback);
