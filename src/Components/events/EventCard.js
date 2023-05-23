import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { handleButtonEvent, getTextButton } from "../../utils";
import "./eventCardStyle.scss";

const EventCard = (props) => {
  const {
    userId,
    setGoToDetailEvent,
    setEventId,
    viewEvents,
    setGoToEditEvent,
    setEventToEdit,
    eventDetail,
    setRefreshEvents,
  } = props;
  const textButton = getTextButton(userId, eventDetail);

  const changeClassNameButton = () => {
    let buttonClass = "";

    if (textButton === "join") {
      buttonClass = "button-event";
    } else if (textButton === "leave") {
      buttonClass = "pink-class-button";
    } else {
      buttonClass = "gray-class-button";
    }

    return buttonClass;
  };

  return (
    <div
      key={String(eventDetail.id)}
      className={
        viewEvents
          ? `element-${eventDetail.id} element modified`
          : `element-${eventDetail.id} element-column`
      }
      onClick={(e) => {
        const elementClassName = e.target.className;
        // if button is clicked, dont go to event detail page
        if (
          !(
            elementClassName.includes("button-event") ||
            elementClassName.includes("pink-class-button") ||
            elementClassName.includes("gray-class-button")
          )
        ) {
          setGoToDetailEvent(true);
          setEventId(eventDetail.id);
        }
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
          className={`${changeClassNameButton()} ${eventDetail.id}`}
          onClick={async (e) => {
            await handleButtonEvent({
              e,
              textButton,
              userId,
              eventDetail,
              setGoToEditEvent,
              setEventToEdit,
              setRefreshEvents,
            });
          }}
        >
          {textButton}
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
