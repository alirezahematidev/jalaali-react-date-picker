import { ReactNode } from "react";
import { Icon } from "../icon";

interface SuffixProps {
  suffixIcon?: ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  error?: boolean;
}

const Suffix = ({ clearable, suffixIcon, onClear, error }: SuffixProps) => {
  if (suffixIcon || suffixIcon === null) {
    return <>{suffixIcon}</>;
  }
  if (error) {
    return (
      <div className="icon-wrapper">
        <Icon.Error />
      </div>
    );
  }
  if (clearable) {
    return (
      <div className="icon-wrapper">
        <Icon.Clear
          onClick={(e) => {
            e.stopPropagation();
            onClear?.();
          }}
        />
      </div>
    );
  }
  return (
    <div className="icon-wrapper">
      <Icon.Calendar />
    </div>
  );
};
export { Suffix };
