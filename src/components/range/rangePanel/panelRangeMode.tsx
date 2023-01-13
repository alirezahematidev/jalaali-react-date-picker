import { createContext, memo, useContext } from "react";
import { Mode, RangeProps } from "../../../core";

interface RangePanelModeProps extends RangeProps {
  children: JSX.Element | JSX.Element[] | null;
  shouldResponsive?: boolean;
  presets?: boolean;
}

interface RangePanelModeContext extends RangePanelModeProps {
  onChangeMode?: (mode: Mode) => void;
  onClose?: () => void;
}

const RangePanelModeContext = createContext<
  Omit<RangePanelModeContext, "children">
>({
  headerRender: () => null,
  panelRender: () => null,
  onChangeMode: () => null,
  onModeChange: () => null,
  dayLabelRender: () => null,
  onClose: () => null,
  presets: true,
  shouldResponsive: false,
  highlightDays: undefined,
  highlightWeekend: true,
});

const RangePanelMode = memo(({ children, ...props }: RangePanelModeProps) => {
  return (
    <RangePanelModeContext.Provider value={{ ...props }}>
      {children}
    </RangePanelModeContext.Provider>
  );
});

export const useRangePanelContext = () => useContext(RangePanelModeContext);

export default RangePanelMode;
