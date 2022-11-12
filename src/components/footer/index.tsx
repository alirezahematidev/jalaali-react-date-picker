import { PanelProps, useDatepicker, useTranslation } from "../../core";

interface FooterProps extends Pick<PanelProps, "footerRender"> {}

export const Footer = ({ footerRender }: FooterProps) => {
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
      {footerRender ? footerRender(current, node) : node}
    </div>
  );
};
