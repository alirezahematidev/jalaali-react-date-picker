import "../../styles/index.scss";
import moment from "moment-jalaali";
import { Days } from "../days";
import { Header } from "../header";
moment.loadPersian({ dialect: "persian-modern" });

const Panel = () => {
  return (
    <div className="panel-rtl">
      <Header />
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
