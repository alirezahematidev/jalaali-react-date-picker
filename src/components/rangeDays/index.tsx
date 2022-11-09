import { isEqual } from "lodash-es";
import classNames from "classnames";
import Day from "../day";
import { DayLabel } from "../dayLabel";
import { Header, HeaderProps } from "../header";
import { useDatepicker } from "../../core";
import { usePanelContext } from "../panel/panelMode";
import { Fragment } from "react";
import { Date } from "../../core/types/global.types";
import { useDays } from "../../core/hooks/useDays";

export interface DaysProps extends HeaderProps {}

const RangeDays = () => {
  const {
    cacheDate: selected,
    onDaychange,
    onDateChange,
    dayLabels,
  } = useDatepicker();

  const { groupedRangeDays } = useDays();

  const { onChangeMode, panelRender, dayLabelRender, highlightOffDays } =
    usePanelContext();

  //   const days: Date[] = metadataDays.map(({ day, month, year }) => ({
  //     day,
  //     month,
  //     year,
  //   }));

  //   const canHighlighWeekend =
  //     highlightOffDays && highlightOffDays.weekend !== undefined
  //       ? highlightOffDays.weekend
  //       : true;

  //   const node = (
  //     <Fragment>
  //       {metadataDays.map(({ id, isNotCurrentMonth, isWeekend, ...date }) => (
  //         <div
  //           key={`${id}-${date.month}`}
  //           className={classNames("day-item-outer")}
  //         >
  //           <Day
  //             day={date.day}
  //             isNotCurrentMonth={isNotCurrentMonth}
  //             onPress={() => {
  //               onDaychange(date);
  //               onDateChange(date);
  //             }}
  //             isHighlight={isEqual(selected, date)}
  //             isOff={(highlightOffDays?.customDates || [])?.some((d) =>
  //               isEqual(d, date),
  //             )}
  //             isWeekend={canHighlighWeekend ? isWeekend : false}
  //           />
  //         </div>
  //       ))}
  //     </Fragment>
  //   );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
      }}
    >
      {groupedRangeDays.map((days, index) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
            key={index}
          >
            <Header
              onSelectMonthPicker={() => onChangeMode?.("month")}
              onSelectYearPicker={() => onChangeMode?.("year")}
            />
            <DayLabel dayLabelRender={dayLabelRender} />
            <div className="days-body">
              {days.map(({ id, isNotCurrentMonth, isWeekend, ...date }) => (
                <div
                  key={`${id}-${date.month}`}
                  className={classNames("day-item-outer")}
                >
                  <Day
                    day={date.day}
                    isNotCurrentMonth={isNotCurrentMonth}
                    onPress={() => {
                      onDaychange(date);
                      onDateChange(date);
                    }}
                    isHighlight={isEqual(selected, date)}
                    isOff={(highlightOffDays?.customDates || [])?.some((d) =>
                      isEqual(d, date),
                    )}
                    //   isWeekend={canHighlighWeekend ? isWeekend : false}
                    isWeekend={false}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
      {/* <Header
        onSelectMonthPicker={() => onChangeMode?.("month")}
        onSelectYearPicker={() => onChangeMode?.("year")}
      />
      <DayLabel dayLabelRender={dayLabelRender} />
      <div className="days-body">
        {panelRender ? panelRender({ days, dayLabels, selected }, node) : node}
      </div> */}
      {/* {metadataDays.map(({ id, isNotCurrentMonth, isWeekend, ...date }) => (
        <div
          key={`${id}-${date.month}`}
          className={classNames("day-item-outer")}
        >
          <Day
            day={date.day}
            isNotCurrentMonth={isNotCurrentMonth}
            onPress={() => {
              onDaychange(date);
              onDateChange(date);
            }}
            isHighlight={isEqual(selected, date)}
            isOff={(highlightOffDays?.customDates || [])?.some((d) =>
              isEqual(d, date),
            )}
            isWeekend={canHighlighWeekend ? isWeekend : false}
          />
        </div>
      ))} */}
    </div>
  );
};

export { RangeDays };
