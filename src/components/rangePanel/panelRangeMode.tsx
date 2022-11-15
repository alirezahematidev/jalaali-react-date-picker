import { createContext, useContext } from "react";
import { DateRangePickerTypes, RangePanelProps } from "../../core";
import { RangePanelTemplate } from "./panelTemplate";

type Panel = Record<DateRangePickerTypes.Mode, JSX.Element>;

interface RangePanelModeProps extends RangePanelProps {}

interface RangePanelModeContext extends RangePanelModeProps {
  onChangeMode?: (mode: DateRangePickerTypes.Mode) => void;
}

const RangePanelModeContext = createContext<RangePanelModeContext>({
  headerRender: () => null,
  panelRender: () => null,
  onChangeMode: () => null,
  dayLabelRender: () => null,
  highlightOffDays: {
    customDates: [],
    weekend: true,
  },
});

export const RangePanelMode = ({ ...props }: RangePanelModeProps) => {
  return (
    <RangePanelModeContext.Provider value={{ ...props }}>
      <RangePanelTemplate type="from" />
      <RangePanelTemplate type="to" />
    </RangePanelModeContext.Provider>
  );
};

export const useRangePanelContext = () => useContext(RangePanelModeContext);
