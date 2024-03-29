import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import {
  handleButtonEvent,
  getTextButton,
  getButtonClassName,
} from "../../utils";
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
    setErrorJoinEvents
  } = props;

  const textButton = getTextButton(userId, eventDetail);

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
            elementClassName.includes("pink-class-btn") ||
            elementClassName.includes("gray-class-btn")
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
          className={`${getButtonClassName(textButton)} ${eventDetail.id}`}
          onClick={async (e) => {
            await handleButtonEvent({
              textButton,
              userId,
              eventDetail,
              setGoToEditEvent,
              setEventToEdit,
              setRefreshEvents,
              setErrorJoinEvents
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
