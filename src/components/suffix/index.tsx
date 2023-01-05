import { ReactNode } from "react";
import { Icon } from "../icon";

interface SuffixProps {
  suffixIcon?: ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}

const Suffix = ({ clearable, suffixIcon, onClear }: SuffixProps) => {
  return (
    <div className="icon-wrapper">
      {(clearable && (
        <Icon.Clear
          onClick={(e) => {
            e.stopPropagation();
            onClear?.();
          }}
        />
      )) ||
        suffixIcon || <Icon.Calendar />}
    </div>
  );
};
export { Suffix };
