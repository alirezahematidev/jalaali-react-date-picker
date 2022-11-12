import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("test onchange", () => {
  test("test", () => {
    expect(true).toBe(true);
  });
});
