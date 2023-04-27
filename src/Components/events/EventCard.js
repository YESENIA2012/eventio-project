import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import { handleButtonEvent } from "../../utils";
import "./eventCardStyle.scss";
import { Fragment } from "react";

const EventCard = (props) => {
  const {
    viewEvents,
    setGoToEditEvent,
    setEventToEdit,
    eventsList,
    setEventList,
    eventDetail,
  } = props;

  return (
    <Fragment>
      <div className="date-time-container">
        <span className="date">{eventDetail.date}</span>
        <span className="dash">-</span>
        <span className="time">{eventDetail.time}</span>
      </div>
      <h4 className="title-event">{eventDetail.nameEvent}</h4>
      <p className="p-host">{eventDetail.host}</p>
      <p className="description-event">{eventDetail.descriptionEvent}</p>
      <div className="button-attendees-capacity-container ">
        <span className="attendees">
          <PersonIcon className={viewEvents ? "" : "icon-hide-person"} />
          <span>{eventDetail.attendees}</span>
          <span className="of-text">of</span>
          <span>{eventDetail.capacity}</span>
        </span>
        <Button
          variant="contained"
          className={`button-event ${eventDetail.id}`}
          onClick={(e) => {
            handleButtonEvent(
              e,
              eventDetail,
              setGoToEditEvent,
              setEventToEdit,
              eventsList,
              setEventList
            );
          }}
        >
          {eventDetail.stateEvent}
        </Button>
      </div>
    </Fragment>
  );
};

export default EventCard;
