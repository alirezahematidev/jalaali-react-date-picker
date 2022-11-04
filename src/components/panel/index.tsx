import classNames from "classnames";
import "../../styles/index.scss";
import Day from "../day";
import moment from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern" });

const Panel = () => {
  return (
    <div className="panel-ltr">
      <div className="panel-header-rtl">
        <div className="panel-header-inner">
          <span>{`<<`}</span>
          <div className="panel-date-holder">
            <div className="panel-date-holder-item">
              <p style={{ fontSize: 14 }}>فروردین</p>
            </div>
            <div className="panel-date-holder-item">
              <p style={{ fontSize: 14 }}>1401</p>
            </div>
          </div>
          <span>{`>>`}</span>
        </div>
      </div>
      <div className="panel-body">
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} className={classNames("day-item-outer")}>
            <Day day={i + 1} />
          </div>
        ))}
      </div>
      <div className="panel-footer-rtl">
        <p>امروز</p>
      </div>
    </div>
  );
};

export default Panel;
