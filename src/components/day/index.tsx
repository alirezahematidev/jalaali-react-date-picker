import React, { useEffect } from "react";
import { ColorSchema, MonthKey } from "../../core/types/global.types";
import classnames from "classnames";

interface DayProps {
  id: string;
  day: number;
  monthId: MonthKey;
  isHighlight?: boolean;
  isOffDay?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
}

const Day = ({
  day,
  id,
  monthId,
  isDisabled,
  isHighlight,
  isOffDay,
  onPress,
}: DayProps) => {
  return (
    <div className={classnames("day", isHighlight && "highlight")}>
      <span>{day}</span>
    </div>
  );
};

export default Day;
