import { useState, createContext, useContext } from "react";
import { DatePickerTypes, PanelProps } from "../../core";
import { Days } from "../days";
import { Months } from "../months";
import { Years } from "../years";

type Panel = Record<DatePickerTypes.Mode, JSX.Element>;

interface PanelModeProps extends Omit<PanelProps, "renderFooter"> {}

interface PanelModeContext extends PanelModeProps {
  onChangeMode?: (mode: DatePickerTypes.Mode) => void;
}

const PanelModeContext = createContext<PanelModeContext>({
  headerRender: () => null,
  panelRender: () => null,
  onChangeMode: () => null,
  dayLabelRender: () => null,
  highlightOffDays: {
    customDates: [],
    weekend: true,
  },
});

export const PanelMode = ({ onModeChange, ...props }: PanelModeProps) => {
  const [mode, setMode] = useState<DatePickerTypes.Mode>("day");

  const onChangeMode = (mode: DatePickerTypes.Mode) => {
    setMode(mode);
    onModeChange?.(mode);
  };

  const panel: Panel = {
    day: <Days />,
    month: <Months />,
    year: <Years />,
  };

  return (
    <PanelModeContext.Provider value={{ ...props, onChangeMode }}>
      {panel[mode]}
    </PanelModeContext.Provider>
  );
};

export const usePanelContext = () => useContext(PanelModeContext);
