import { ReactNode } from "react";
import calendar from "../../assets/icons/calendar.svg";
import clear from "../../assets/icons/clear.svg";

interface SuffixProps {
  suffixIcon?: ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}

const Suffix = ({ clearable, suffixIcon, onClear }: SuffixProps) => {
  return (
    <div>
      {(clearable && (
        <img
          className="clear-icon"
          onClick={onClear}
          src={clear}
          alt="clear"
          width={20}
          height={20}
        />
      )) ||
        suffixIcon || (
          <div className="calendar-icon">
            <img src={calendar} alt="calendar" width={20} height={20} />
          </div>
        )}
    </div>
  );
};
export { Suffix };
