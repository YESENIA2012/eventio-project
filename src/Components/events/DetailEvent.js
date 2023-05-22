import { useContext, useEffect, useState } from "react";
import { Navigate, useParams, useLocation } from "react-router-dom";
import { handleButtonEvent, getTextButton } from "../../utils";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import AvatarUser from "../avatarUser/AvatarUser";

import "./detailEventStyle.scss";
import { UserContext } from "../globalState";
import { getEventFromServer } from "../../utils";

const DetailEvent = () => {
  const { user } = useContext(UserContext);
  const eventId = useParams().id;
  const location = useLocation();
  const userId = location.state.userId;
  const [goToCreateNewEvent, setGoToCreateNewEvent] = useState(false);
  const [goToDashboard, setGoToDashboard] = useState(false);
  const [goToEditEvent, setGoToEditEvent] = useState(false);
  const [eventToEdit, setEventToEdit] = useState("");
  const [event, setEvent] = useState(null);
  const [textButton, setTextButton] = useState("");

  useEffect(() => {
    //aca
    async function getEvent() {
      try {
        const eventFound = await getEventFromServer(eventId);
        const textButtonEvent = getTextButton(userId, eventFound);
        setEvent(eventFound);
        setTextButton(textButtonEvent);
      } catch (error) {
        console.log("error", error);
      }
    }

    getEvent();
  }, []);

  const drawEvent = () => {
    if (!eventId || !event) {
      return;
    }
    const buttonClass =
      textButton === "join" || textButton === "edit"
        ? "button-event-detail"
        : "pink-class";

    return (
      <div className="container-event">
        <div className="information-event">
          <div className="time-date-container">
            <span className="date-d">{event.date}</span>
            <span className="dash-d">-</span>
            <span className="time-d">{event.time}</span>
          </div>
          <h1 className="title">{event.nameEvent}</h1>
          <p className="host-e">{event.host}</p>
          <p className="description-event-e">{event.descriptionEvent}</p>
          <div className="attendees-capacity-button-container">
            <div className="attendees-capacity-container">
              <PersonIcon className="person-icon" />
              <span className="attendees">{event.attendees.length}</span>
              <span className="of-text-d">of</span>
              <span>{event.capacity}</span>
            </div>
            <Button
              variant="contained"
              className={`${buttonClass} ${event.id}`}
              onClick={(e) => {
                handleButtonEvent(
                  e,
                  textButton,
                  userId,
                  event,
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
        <div className="name-attendees">Attendees</div>
      </div>
    );
  };

  if (goToCreateNewEvent) {
    return <Navigate to="/createEvent" />;
  } else if (goToDashboard) {
    return <Navigate to="/dashboard" />;
  } else if (goToEditEvent) {
    return <Navigate to={`/editEvent/${eventToEdit}`} />;
  } else {
    return (
      <div className="container-event-section">
        <header className="header-component">
          <div
            className="back-button"
            onClick={() => {
              setGoToDashboard(true);
            }}
          >
            <ArrowBackIcon />
            <span>Back to events</span>
          </div>
          <AvatarUser user={user} className="avatar-name" />
        </header>
        <p className="p-title">DETAIL EVENT</p>
        <section className="section-event-information">{drawEvent()}</section>
        <div className="add-new-event-container">
          <AddCircleIcon
            className="add-new-event-button"
            onClick={() => {
              setGoToCreateNewEvent(true);
            }}
          />
        </div>
      </div>
    );
  }
};

export default DetailEvent;
