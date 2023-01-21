import { createContext, useContext, useMemo, useState } from "react";
import { Mode, NavigationIcon, PickerProps } from "../../../core";

import Days from "../days";
import Months from "../months";
import Years from "../years";

type Panel = Record<Mode, JSX.Element>;

interface PanelModeProps extends Omit<PickerProps, "renderFooter"> {
  toggle?: () => void;
  navigationIcons?: NavigationIcon;
  presets?: boolean;
}

interface PanelModeContext extends PanelModeProps {
  onChangeMode?: (mode: Mode) => void;
}

const PanelModeContext = createContext<PanelModeContext>({
  headerRender: undefined,
  panelRender: undefined,
  dayLabelRender: undefined,
  presets: true,
  onChangeMode: () => null,
  toggle: () => null,
  navigationIcons: undefined,
  highlightDays: undefined,
  highlightWeekend: true,
});

const PanelMode = ({
  toggle,
  onModeChange,
  navigationIcons,
  presets,
  ...props
}: PanelModeProps) => {
  const [mode, setMode] = useState<Mode>("day");

  const onChangeMode = (mode: Mode) => {
    setMode(mode);
    onModeChange?.(mode);
  };

  const panel: Panel = useMemo(
    () => ({
      day: <Days />,
      month: <Months />,
      year: <Years />,
    }),
    [],
  );

  return (
    <PanelModeContext.Provider
      value={{ ...props, onChangeMode, navigationIcons, toggle, presets }}
    >
      {panel[mode]}
    </PanelModeContext.Provider>
  );
};

export const usePanelContext = () => useContext(PanelModeContext);

export default PanelMode;
