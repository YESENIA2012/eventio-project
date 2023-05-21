import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { handleButtonEvent, getTextButton } from "../../utils";
import "./eventCardStyle.scss";
import { useState } from "react";

const EventCard = (props) => {
  const {
    userId,
    setGoToDetailEvent,
    setEventId,
    viewEvents,
    setGoToEditEvent,
    setEventToEdit,
    eventDetail,
  } = props;
  const defaultText = getTextButton(userId, eventDetail);
  const [textButton, setTextButton] = useState(defaultText);
  const buttonClass =
    textButton === "join" || textButton === "edit"
      ? "button-event"
      : "pink-class-button";
  console.log("eventDetail.id ", eventDetail.id);
  return (
    <div
      key={String(eventDetail.id)}
      className={
        viewEvents
          ? `element-${eventDetail.id} element modified`
          : `element-${eventDetail.id} element-column`
      }
      // hay un error en el key
      onClick={(e) => {
        setGoToDetailEvent(true);
        setEventId(eventDetail.id);
      }}
    >
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
          className={`${buttonClass} ${eventDetail.id}`}
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
    </div>
  );
};

export default EventCard;
