import PersonIcon from "@mui/icons-material/Person";

import "./detailEventStyle.scss";
import { mockedEvents } from "../../utils";

const DetailEvent = (props) => {
  const { eventClicked, hiddenEventsList } = props;

  const drawEvent = () => {
    if (
      eventClicked === undefined ||
      isNaN(eventClicked) ||
      eventClicked === ""
    ) {
      return;
    } else {
      return (
        <div className="container-event">
          <div className="information-event">
            <p className="time">
              {mockedEvents[eventClicked].dateAndTime} yesenia
            </p>
            <h1 className="title">{mockedEvents[eventClicked].nameEvent}</h1>
            <p className="host-e">{mockedEvents[eventClicked].host}</p>
            <p className="description-event-e">
              {mockedEvents[eventClicked].descriptionEvent}
            </p>
            <div className="attendees-e">
              <PersonIcon />
              <span>{mockedEvents[eventClicked].attendees}</span>
            </div>
          </div>
          <div className="name-attendees">Attendees</div>
        </div>
      );
    }
  };

  return (
    <div
      className={hiddenEventsList ? "container-event-section" : "event-hidden"}
    >
      <p className="p-title">DETAIL EVENT</p>
      <section className="section-event-information">{drawEvent()}</section>
    </div>
  );
};

export default DetailEvent;
