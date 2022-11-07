import { Fragment } from "react";
import { PanelProps, useDatepicker, useTranslation } from "../../core";
import { dateTransformer } from "../../utils";

interface FooterProps extends Pick<PanelProps, "renderFooter"> {}

export const Footer = ({ renderFooter }: FooterProps) => {
  const { t } = useTranslation();
  const { goToToday, isJalaali, state } = useDatepicker();

  const node = (
    <div className="panel-footer-rtl">
      <p onClick={goToToday} className="clickable">
        {t("today")}
      </p>
    </div>
  );

  return (
    <Fragment>
      {renderFooter
        ? renderFooter(dateTransformer(state, isJalaali), node)
        : node}
    </Fragment>
  );
};
