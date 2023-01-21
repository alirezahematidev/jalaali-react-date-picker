import classNames from "classnames";
import moment from "moment-jalaali";
import { ForwardedRef, forwardRef, Ref } from "react";
import {
  NavigationIcon,
  PickerProps as Props,
  useDatepicker,
} from "../../../core";
import { Footer } from "../../footer";
import { Loading } from "../../loading";
import PanelMode from "./panelMode";

moment.loadPersian({ dialect: "persian-modern" });

interface PanelProps extends Props {
  ref?: Ref<HTMLDivElement>;
  toggle?: () => void;
  navigationIcons?: NavigationIcon;
  presets?: boolean;
}

type PanelComponent = typeof Panel;

const Panel = (
  {
    footerRender,
    headerRender,
    panelRender,
    highlightDays,
    dayLabelRender,
    onModeChange,
    toggle,
    navigationIcons,
    highlightWeekend,
    style,
    className,
    loading,
    loadingIndicator,
    presets,
  }: PanelProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { isJalaali } = useDatepicker();

  return (
    <div
      ref={ref}
      className={classNames(
        isJalaali ? "panel-jalaali" : "panel-gregorian",
        "panel-elevation",
        className,
      )}
      style={style}
    >
      <Loading loading={loading} indicator={loadingIndicator}>
        <PanelMode
          {...{
            headerRender,
            panelRender,
            dayLabelRender,
            highlightDays,
            onModeChange,
            toggle,
            navigationIcons,
            highlightWeekend,
            presets,
          }}
        />
        <Footer toggle={toggle} footerRender={footerRender} />
      </Loading>
    </div>
  );
};

const PanelWithRef = forwardRef<HTMLDivElement, PanelProps>(
  Panel,
) as PanelComponent;

export default PanelWithRef;
