import { PanelProps, useDatepicker, useTranslation } from "../../core";

interface FooterProps extends Pick<PanelProps, "renderFooter"> {}

export const Footer = ({ renderFooter }: FooterProps) => {
  const { t } = useTranslation();
  const { goToToday, state } = useDatepicker();

  const current = state && state.day !== 0 ? state : null;

  const node = (
    <div className="panel-footer-rtl">
      <div onClick={goToToday}>
        <p className="today-text clickable">{t("today")}</p>
      </div>
    </div>
  );

  return (
    <div className="panel-footer-wrapper">
      {renderFooter ? renderFooter(current, node) : node}
    </div>
  );
};
