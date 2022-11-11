import { useState, createContext, useContext } from "react";
import { DateRangePickerTypes, RangePanelProps } from "../../core";
import { Months } from "../months";
import { RangeDays } from "../rangeDays";
import { Years } from "../years";

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

export const RangePanelMode = ({
  onModeChange,
  ...props
}: RangePanelModeProps) => {
  const [mode, setMode] = useState<DateRangePickerTypes.Mode>("day");

  const onChangeMode = (mode: DateRangePickerTypes.Mode) => {
    setMode(mode);
    onModeChange?.(mode);
  };

  const panel: Panel = {
    day: <RangeDays />,
    month: <Months />,
    year: <Years />,
  };

  return (
    <RangePanelModeContext.Provider value={{ ...props, onChangeMode }}>
      {panel[mode]}
    </RangePanelModeContext.Provider>
  );
};

export const useRangePanelContext = () => useContext(RangePanelModeContext);
