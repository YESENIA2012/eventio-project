import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import { handleButtonEvent } from "../../utils";
import "./eventCardStyle.scss";
import { Fragment } from "react";

const EventCard = (props) => {
  const {
    viewEvents,
    setGoToEditEvent,
    eventToEdit,
    setEventToEdit,
    eventsList,
    setEventList,
    eventDetail,
  } = props;

  return (
    <Fragment>
      <div className="date-time-container">
        <spam className="date">{eventDetail.date}</spam>
        <span className="dash">-</span>
        <spam className="time">{eventDetail.time}</spam>
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
          onClick={(stateEvent) => {
            handleButtonEvent(
              stateEvent,
              eventDetail,
              setGoToEditEvent,
              setEventToEdit,
              eventToEdit,
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
