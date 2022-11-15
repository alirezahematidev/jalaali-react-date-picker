import { createContext, useContext } from "react";
import { DateRangePickerTypes } from "../../core";

interface RangeTemplateContextType {
  type: "from" | "to";
  onChangeMode?: (mode: DateRangePickerTypes.Mode) => void;
}

export const RangeTemplateContext = createContext<RangeTemplateContextType>({
  type: "from",
  onChangeMode: () => null,
});

export const useRangeTemplate = () => {
  return useContext(RangeTemplateContext);
};
