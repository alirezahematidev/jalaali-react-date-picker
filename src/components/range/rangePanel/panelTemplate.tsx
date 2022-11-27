import { useState } from "react";
import { DateRangePickerTypes, useRangepicker } from "../../../core";
import { RangeDays } from "../rangeDays";
import { RangeMonths } from "../rangeMonths";
import { RangeYears } from "../rangeYears";
import { RangeTemplateContext } from "./templateContext";

export interface RangePanelTemplateProps {
  type: "from" | "to";
}

type Panel = Record<DateRangePickerTypes.Mode, JSX.Element>;

const RangePanelTemplate = ({ type }: RangePanelTemplateProps) => {
  const [mode, setMode] = useState<DateRangePickerTypes.Mode>("day");
  const { from } = useRangepicker();

  const onChangeMode = (mode: DateRangePickerTypes.Mode) => {
    setMode(mode);
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
