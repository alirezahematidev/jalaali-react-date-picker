import "../../styles/index.scss";
import moment from "moment-jalaali";
import { Days } from "../days";
import { Header } from "../header";
import { DayLabel } from "../dayLabel";

moment.loadPersian({ dialect: "persian-modern" });

const Panel = () => {
  return (
    <div className="panel-rtl">
      <Header />
      <DayLabel />
      <div className="panel-body">
        <Days />
      </div>
      <div className="panel-footer-rtl">
        <p>امروز</p>
      </div>
    </div>
  );
};

export default Panel;
