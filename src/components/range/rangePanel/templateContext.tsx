import { createContext, useContext } from "react";
import { Mode } from "../../../core";

interface RangeTemplateContextType {
  type: "from" | "to";
  onChangeMode?: (mode: Mode) => void;
}

export const RangeTemplateContext = createContext<RangeTemplateContextType>({
  type: "from",
  onChangeMode: () => null,
});

export const useRangeTemplate = () => {
  return useContext(RangeTemplateContext);
};
