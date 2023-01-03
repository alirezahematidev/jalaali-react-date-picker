import { createContext, useContext } from "react";
import { Mode, RangeProps } from "../../../core";
import { RangePanelTemplate } from "./panelTemplate";

interface RangePanelModeProps extends RangeProps {}

interface RangePanelModeContext extends RangePanelModeProps {
  onChangeMode?: (mode: Mode) => void;
  toggle?: () => void;
}

const RangePanelModeContext = createContext<RangePanelModeContext>({
  headerRender: () => null,
  panelRender: () => null,
  onChangeMode: () => null,
  dayLabelRender: () => null,
  toggle: () => null,
  highlightDays: undefined,
  customColors: undefined,
  weekend: true,
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
