import PersonIcon from "@mui/icons-material/Person";

import "./eventClickedStyles.scss";
import eventsInformation from "../../utils";

const EventClickedComponent = (props) => {
  const { eventClicked, hiddenEventsList } = props;

  const drawEvent = () => {
    let eventToDraw = eventClicked;

    if (eventToDraw === undefined) {
      return;
    } else {
      return (
        <div className="container">
          <div className="information-event">
            <span className="time">
              {eventsInformation[eventToDraw].dateAndTime}
            </span>
            <h1 className="title">
              {eventsInformation[eventToDraw].nameEvent}
            </h1>
            <p className="host-e">{eventsInformation[eventToDraw].host}</p>
            <p className="description-event-e">
              {eventsInformation[eventToDraw].descriptionEvent}
            </p>
            <div className="attendees-e">
              <PersonIcon />
              <span>{eventsInformation[eventToDraw].attendees}</span>
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

export default EventClickedComponent;
