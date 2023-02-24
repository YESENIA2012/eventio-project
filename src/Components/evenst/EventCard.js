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
    date,
    time,
    nameEvent,
    host,
    descriptionEvent,
    attendees,
    capacity,
    id,
    stateEvent,
  } = props;

  return (
    <Fragment>
      <div className="date-time-container">
        <spam className="date">{date}</spam>
        <span className="dash">-</span>
        <spam className="time">{time}</spam>
      </div>
      <h4 className="title-event">{nameEvent}</h4>
      <p className="p-host">{host}</p>
      <p className="description-event">{descriptionEvent}</p>
      <div className="button-attendees-capacity-container ">
        <span className="attendees">
          <PersonIcon className={viewEvents ? "" : "icon-hide-person"} />
          <span>{attendees}</span>
          <span className="of-text">of</span>
          <span>{capacity}</span>
        </span>
        <Button
          variant="contained"
          className={`button-event ${id}`}
          onClick={(e) => {
            handleButtonEvent(
              e,
              setGoToEditEvent,
              setEventToEdit,
              eventToEdit,
              eventsList,
              setEventList
            );
          }}
        >
          {stateEvent}
        </Button>
      </div>
    </Fragment>
  );
};

export default EventCard;
