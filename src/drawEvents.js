import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { showDetailEventClicked, handleButtonEvent } from "./utils";

function drawEventsProfile(
  eventsList,
  pagesVisited,
  eventsPerPage,
  viewEvents,
  setGoToDetailEvent,
  setEventClicked,
  setGoToEditEvent,
  setEventToEdit,
  eventToEdit,
  setEventList
) {
  const displayEvents = eventsList
    .slice(pagesVisited, pagesVisited + eventsPerPage)
    .map((element, index) => {
      if (element.stateEvent === "EDIT" || element.stateEvent === "LEAVE") {
        return (
          <div
            key={index}
            className={
              viewEvents
                ? `element-${index} element`
                : `element-${index} element-column`
            }
            onClick={(e) =>
              showDetailEventClicked(e, setGoToDetailEvent, setEventClicked)
            }
          >
            <div className="date-time-container">
              <spam className="date">{element.date}</spam>
              <span className="dash">-</span>
              <spam className="time">{element.time}</spam>
            </div>
            <h4 className="title-event">{element.nameEvent}</h4>
            <p className="p-host">{element.host}</p>
            <p className="description-event">{element.descriptionEvent}</p>
            <div className="button-attendees-capacity-container ">
              <span className="attendees">
                <PersonIcon className={viewEvents ? "" : "icon-hide-person"} />
                <span>{element.attendees}</span>
                <span className="of-text">of</span>
                <span>{element.capacity}</span>
              </span>
              <Button
                variant="contained"
                className={`button-event ${element.id}`}
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
                {element.stateEvent}
              </Button>
            </div>
          </div>
        );
      }
    });
  return displayEvents;
}

export { drawEventsProfile };
