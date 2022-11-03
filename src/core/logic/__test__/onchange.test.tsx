import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import moment, { Moment } from "moment-jalaali";
import { onChange } from "../onChange";

enzyme.configure({ adapter: new Adapter() });

interface TestOnchangeProps {
  value: Moment;
  onChange: (value: Moment) => void;
}

const TestOnchange = ({ onChange, value }: TestOnchangeProps) => {
  function onChangeTest() {
    onChange(moment(value));
  }

  return <input onChange={onChangeTest} />;
};

export const onChangeCallbackTest = () => {
  const onChangeMock = jest.fn(onChange);

  const value = moment().clone();

  const component = enzyme.shallow(
    <TestOnchange onChange={onChangeMock} value={value} />,
  );

  component.find("input").simulate("change");

  expect(onChangeMock).toBeCalled();
  expect(onChangeMock).toReturnWith(undefined);
  expect(onChangeMock).toBeCalledWith(value);
  expect(onChangeMock).not.toBeCalledWith(moment());
  expect(onChangeMock).not.toBeCalledWith(value.toISOString());
};

test("check value is moment type", onChangeCallbackTest);
