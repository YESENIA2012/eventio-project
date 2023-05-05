import { useEffect, useState } from "react";
import { Navigate, useParams, useLocation } from "react-router-dom";
import { handleButtonEvent } from "../../utils";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import AvatarUser from "../avatarUser/AvatarUser";

import { getEventsFromLocalStorage, getTextButton } from "../../utils";
import "./detailEventStyle.scss";

const DetailEvent = () => {
  const eventClicked = useParams().id;
  const location = useLocation();
  const userId = location.state.userId;
  const [goToCreateNewEvent, setGoToCreateNewEvent] = useState(false);
  const [goToDashboard, setGoToDashboard] = useState(false);
  const [goToEditEvent, setGoToEditEvent] = useState(false);
  const [eventToEdit, setEventToEdit] = useState("");
  const eventsFromLocalStorage = getEventsFromLocalStorage();
  const [eventsList, setEventList] = useState(eventsFromLocalStorage.events);
  const [textButton, setTextButton] = useState("");

  useEffect(() => {});

  const drawEvent = () => {
    if (!eventClicked) {
      return;
    } else {
      const event = eventsList.find(
        (event) => event.id.toString() === eventClicked
      );

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
                <span className="attendees">{event.attendees}</span>
                <span className="of-text-d">of</span>
                <span>{event.capacity}</span>
              </div>
              <Button
                variant="contained"
                className={`button-event-detail ${event.id}`}
                onClick={(e) => {
                  handleButtonEvent(
                    e,
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
    }
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
          <AvatarUser className="avatar-name" />
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
