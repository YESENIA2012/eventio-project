import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { handleButtonEvent } from "../../utils";

import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";

import AvatarUser from "../avatarUser/AvatarUser";
import "./detailEventStyle.scss";

const DetailEvent = () => {
  const location = useLocation();
  const eventClicked = location.state.eventClicked;
  const [goToDashboard, setGoToDashboard] = useState(false);
  const [goToEditEvent, setGoToEditEvent] = useState(false);
  const [eventToEdit, setEventToEdit] = useState("");
  const [eventsList, setEventList] = useState(
    JSON.parse(localStorage.getItem("Events"))
  );

  const drawEvent = () => {
    if (
      eventClicked === undefined ||
      isNaN(eventClicked) ||
      eventClicked === ""
    ) {
      return;
    } else {
      return (
        <div className="container-event">
          <div className="information-event">
            <div className="time-date-container">
              <span className="date-d">{eventsList[eventClicked].date}</span>
              <span className="dash-d">-</span>
              <span className="time-d">{eventsList[eventClicked].time}</span>
            </div>
            <h1 className="title">{eventsList[eventClicked].nameEvent}</h1>
            <p className="host-e">{eventsList[eventClicked].host}</p>
            <p className="description-event-e">
              {eventsList[eventClicked].descriptionEvent}
            </p>
            <div className="attendees-capacity-button-container">
              <div className="attendees-capacity-container">
                <PersonIcon className="person-icon" />
                <span className="attendees">
                  {eventsList[eventClicked].attendees}
                </span>
                <span className="of-text-d">of</span>
                <span>{eventsList[eventClicked].capacity}</span>
              </div>
              <Button
                variant="contained"
                className={`button-event-detail ${eventsList[eventClicked].id}`}
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
                {eventsList[eventClicked].stateEvent}
              </Button>
            </div>
          </div>
          <div className="name-attendees">Attendees</div>
        </div>
      );
    }
  };

  if (goToDashboard) {
    return <Navigate to="/dashboard" />;
  } else if (goToEditEvent) {
    return <Navigate to="/editEvent" state={{ eventToEdit }} />;
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
      </div>
    );
  }
};

export default DetailEvent;
