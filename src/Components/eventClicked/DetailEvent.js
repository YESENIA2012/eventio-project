import PersonIcon from "@mui/icons-material/Person";

import "./detailEventStyle.scss";

import { Button } from "@mui/material";

const DetailEvent = (props) => {
  const { eventClicked, goToDetailEvent } = props;

  const drawEvent = () => {
    const events = JSON.parse(localStorage.getItem("Events"));

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
            <div className="time-date-container">
              <span className="date-d">{events[eventClicked].date}</span>
              <span className="dash-d">-</span>
              <span className="time-d">{events[eventClicked].time}</span>
            </div>
            <h1 className="title">{events[eventClicked].nameEvent}</h1>
            <p className="host-e">{events[eventClicked].host}</p>
            <p className="description-event-e">
              {events[eventClicked].descriptionEvent}
            </p>
            <div className="attendees-capacity-button-container">
              <div className="attendees-capacity-container">
                <PersonIcon className="person-icon" />
                <span className="attendees">
                  {events[eventClicked].attendees}
                </span>
                <span className="of-text-d">of</span>
                <span>{events[eventClicked].capacity}</span>
              </div>
              <Button variant="contained" className="button-event-detail">
                {events[eventClicked].stateEvent}
              </Button>
            </div>
          </div>
          <div className="name-attendees">Attendees</div>
        </div>
      );
    }
  };

  return (
    <div
      className={
        goToDetailEvent ? "container-event-section" : "event-detail-hidden"
      }
    >
      <p className="p-title">DETAIL EVENT</p>
      <section className="section-event-information">{drawEvent()}</section>
    </div>
  );
};

export default DetailEvent;
