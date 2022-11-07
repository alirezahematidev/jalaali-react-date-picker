import { Fragment } from "react";
import { PanelProps, useDatepicker, useTranslation } from "../../core";

interface FooterProps extends Pick<PanelProps, "renderFooter"> {}

export const Footer = ({ renderFooter }: FooterProps) => {
  const { t } = useTranslation();
  const { goToToday, state } = useDatepicker();

  const current = state && state.day !== 0 ? state : null;

  const node = (
    <div className="panel-footer-rtl">
      <p onClick={goToToday} className="clickable">
        {t("today")}
      </p>
    </div>
  );

  return (
    <Fragment>{renderFooter ? renderFooter(current, node) : node}</Fragment>
  );
};
