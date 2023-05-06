import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import { handleButtonEvent, getTextButton } from "../../utils";
import "./eventCardStyle.scss";
import { Fragment, useState } from "react";

const EventCard = (props) => {
  const { userId, viewEvents, setGoToEditEvent, setEventToEdit, eventDetail } =
    props;
  const defaultText = getTextButton(userId, eventDetail);
  const [textButton, setTextButton] = useState(defaultText);

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
          <span>{eventDetail.attendees.length}</span>
          <span className="of-text">of</span>
          <span>{eventDetail.capacity}</span>
        </span>
        <Button
          variant="contained"
          className={`button-event ${eventDetail.id}`}
          onClick={(e) => {
            handleButtonEvent(
              e,
              textButton,
              userId,
              eventDetail,
              setGoToEditEvent,
              setEventToEdit,
              setTextButton
            );
          }}
        >
          {textButton}
        </Button>
      </div>
    </Fragment>
  );
};

export default EventCard;
