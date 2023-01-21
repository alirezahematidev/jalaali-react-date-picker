import { useState } from "react";
import { Mode } from "../../../core";
import RangeDays from "../rangeDays";
import RangeMonths from "../rangeMonths";
import RangeYears from "../rangeYears";
import { useRangePanelContext } from "./panelRangeMode";
import { RangeTemplateContext } from "./templateContext";

export interface RangePanelTemplateProps {
  type?: "from" | "to";
}

type Panel = Record<Mode, JSX.Element>;

const RangePanelTemplate = ({ type = "from" }: RangePanelTemplateProps) => {
  const [mode, setMode] = useState<Mode>("day");
  const panelProps = useRangePanelContext();

  const onChangeMode = (mode: Mode) => {
    setMode(mode);
    panelProps?.onModeChange?.(mode);
  };
  const panel: Panel = {
    day: <RangeDays />,
    month: <RangeMonths />,
    year: <RangeYears />,
  };
  return (
    <RangeTemplateContext.Provider
      value={{
        onChangeMode,
        type,
      }}
    >
      <div className="panel-wrapper">{panel[mode]}</div>
    </RangeTemplateContext.Provider>
  );
};

export { RangePanelTemplate };
