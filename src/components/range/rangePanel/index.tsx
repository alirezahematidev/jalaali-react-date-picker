import classNames from "classnames";
import moment from "moment-jalaali";
import {
  ForwardedRef,
  forwardRef,
  Fragment,
  lazy,
  memo,
  Ref,
  Suspense,
} from "react";
import { Fallback } from "src/components/fallback";
import { RangeProps as Props, useRangepicker } from "../../../core";
import { Loading } from "../../loading";
import { RangePanelTemplate } from "./panelTemplate";

const RangePanelMode = lazy(() => import("./panelRangeMode"));

moment.loadPersian({ dialect: "persian-modern" });

type Responsive = "desktop" | "mobile" | "auto";

interface RangePanelProps extends Props {
  ref?: Ref<HTMLDivElement>;
  responsive?: "desktop" | "mobile" | "auto";
  shouldResponsive?: boolean;
  onClose?: () => void;
  presets?: boolean;
}

type RangePanelComponent = typeof RangePanel;

const RangePanel = (
  {
    headerRender,
    panelRender,
    highlightDays,
    dayLabelRender,
    onModeChange,
    highlightWeekend,
    className,
    style,
    onClose,
    responsive,
    shouldResponsive,
    loading,
    loadingIndicator,
    presets,
  }: RangePanelProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { isJalaali } = useRangepicker();

  const responsiveClassName: Record<Responsive, string> = {
    auto: shouldResponsive ? "mobile-panel" : "desktop-panel",
    desktop: "desktop-panel",
    mobile: "mobile-panel",
  };

  const renderTemplate: Record<Responsive, JSX.Element> = {
    auto: (
      <Fragment>
        {shouldResponsive ? (
          <RangePanelTemplate />
        ) : (
          <Fragment>
            <RangePanelTemplate type="from" />
            <RangePanelTemplate type="to" />
          </Fragment>
        )}
      </Fragment>
    ),
    desktop: (
      <Fragment>
        <RangePanelTemplate type="from" />
        <RangePanelTemplate type="to" />
      </Fragment>
    ),
    mobile: <RangePanelTemplate />,
  };

  return (
    <div
      ref={ref}
      className={classNames(
        isJalaali ? "panel-range-jalaali" : "panel-range-gregorian",
        responsive && shouldResponsive && responsiveClassName[responsive],
        "panel-elevation",
        className,
      )}
      style={style}
    >
      <Loading loading={loading} indicator={loadingIndicator}>
        <Suspense fallback={<Fallback />}>
          <RangePanelMode
            {...{
              headerRender,
              panelRender,
              dayLabelRender,
              highlightDays,
              onModeChange,
              highlightWeekend,
              onClose,
              shouldResponsive,
              presets,
            }}
          >
            {responsive ? (
              renderTemplate[responsive]
            ) : (
              <Fragment>
                <RangePanelTemplate type="from" />
                <RangePanelTemplate type="to" />
              </Fragment>
            )}
          </RangePanelMode>
        </Suspense>
      </Loading>
    </div>
  );
};

const RangePanelWithRef = memo(
  forwardRef<HTMLDivElement, RangePanelProps>(RangePanel),
) as RangePanelComponent;

export default RangePanelWithRef;
