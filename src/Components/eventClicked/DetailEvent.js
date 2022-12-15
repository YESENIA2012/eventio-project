import PersonIcon from "@mui/icons-material/Person";

import "./detailEventStyle.scss";
import { mockedEventsCopy } from "../../utils";
import { Button } from "@mui/material";

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
            <div className="time-date-container">
              <span className="date-d">
                {mockedEventsCopy[eventClicked].date}
              </span>
              <span className="dash-d">-</span>
              <span className="time-d">
                {mockedEventsCopy[eventClicked].time}
              </span>
            </div>
            <h1 className="title">
              {mockedEventsCopy[eventClicked].nameEvent}
            </h1>
            <p className="host-e">{mockedEventsCopy[eventClicked].host}</p>
            <p className="description-event-e">
              {mockedEventsCopy[eventClicked].descriptionEvent}
            </p>
            <div className="attendees-capacity-button-container">
              <div className="attendees-capacity-container">
                <PersonIcon className="person-icon" />
                <span className="attendees">
                  {mockedEventsCopy[eventClicked].attendees}
                </span>
                <span className="of-text-d">of</span>
                <span>{mockedEventsCopy[eventClicked].capacity}</span>
              </div>
              <Button variant="contained" className="button-event-detail">
                {mockedEventsCopy[eventClicked].stateEvent}
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
        hiddenEventsList ? "container-event-section" : "event-detail-hidden"
      }
    >
      <p className="p-title">DETAIL EVENT</p>
      <section className="section-event-information">{drawEvent()}</section>
    </div>
  );
};

export default DetailEvent;
