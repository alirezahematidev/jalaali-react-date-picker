import { PickerProps, useDatepicker, useTranslation } from "../../core";

interface FooterProps extends Pick<PickerProps, "footerRender"> {
  toggle?: () => void;
}

export const Footer = ({ footerRender, toggle }: FooterProps) => {
  const { t } = useTranslation();
  const { goToToday, state } = useDatepicker();

  const current = state && state.day !== 0 ? state : null;

  const node = (
    <div className="panel-footer-rtl">
      <div
        onClick={() => {
          goToToday();
          toggle?.();
        }}
      >
        <span className="today-text clickable">{t("today")}</span>
      </div>
    </div>
  );

  return (
    <div className="panel-footer-wrapper">
      {footerRender ? footerRender(current, node) : node}
    </div>
  );
};
