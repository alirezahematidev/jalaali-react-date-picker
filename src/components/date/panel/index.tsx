import classNames from "classnames";
import moment from "moment-jalaali";
import { ForwardedRef, forwardRef, Ref } from "react";
import {
  PanelProps as Props,
  useDatepicker,
  useSetColors,
} from "../../../core";
import "../../../styles/index.scss";
import { Footer } from "../../footer";
import { PanelMode } from "./panelMode";

moment.loadPersian({ dialect: "persian-modern" });

interface PanelProps extends Props {
  ref?: Ref<HTMLDivElement>;
}

type PanelComponent = typeof Panel;

const Panel = (
  {
    footerRender,
    headerRender,
    panelRender,
    highlightOffDays,
    dayLabelRender,
    onModeChange,
    customColors,
  }: PanelProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { isJalaali } = useDatepicker();

  useSetColors(customColors);

  return (
    <div
      ref={ref}
      className={classNames(
        isJalaali ? "panel-jalaali" : "panel-gregorian",
        "panel-elevation",
      )}
    >
      <PanelMode
        {...{
          headerRender,
          panelRender,
          dayLabelRender,
          highlightOffDays,
          onModeChange,
        }}
      />
      <Footer footerRender={footerRender} />
    </div>
  );
};

const PanelWithRef = forwardRef<HTMLDivElement, PanelProps>(
  Panel,
) as PanelComponent;

export default PanelWithRef;
