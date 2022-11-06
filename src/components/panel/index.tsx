import "../../styles/index.scss";
import moment from "moment-jalaali";
import { Days } from "../days";
import { Header } from "../header";
import { DayLabel } from "../dayLabel";
import { useDatepicker } from "../../core/logic/useDatepicker";

moment.loadPersian({ dialect: "persian-modern" });

const Panel = () => {
  const { goToToday } = useDatepicker();
  return (
    <div className="panel-rtl">
      <Header />
      <DayLabel />
      <div className="panel-body">
        <Days />
      </div>
      <div className="panel-footer-rtl">
        <p onClick={goToToday}>امروز</p>
      </div>
    </div>
  );
};

export default Panel;
