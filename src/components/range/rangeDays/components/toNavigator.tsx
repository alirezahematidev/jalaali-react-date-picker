import { Icon } from "../../../icon";

interface ToNavigatorProps {
  onIncreaseYear: () => void;
  onIncreaseMonth: () => void;
  isJalaali: boolean;
  shouldResponsive?: boolean;
  type: "from" | "to";
}

export const ToNavigator = ({
  isJalaali,
  onIncreaseMonth,
  onIncreaseYear,
  type,
  shouldResponsive,
}: ToNavigatorProps) => {
  if (shouldResponsive) return null;

  if (type === "from") return <div className="panel-empty-holder" />;

  return (
    <div className="center">
      <div onClick={onIncreaseMonth}>
        <Icon.Chevron isJalaali={!isJalaali} hoverEffect />
      </div>
      <div onClick={onIncreaseYear}>
        <Icon.DoubleChevron isJalaali={!isJalaali} hoverEffect />
      </div>
    </div>
  );
};
