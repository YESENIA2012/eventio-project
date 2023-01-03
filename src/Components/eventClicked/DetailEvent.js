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
  const events = JSON.parse(localStorage.getItem("Events"));
  const [goToDashboard, setGoToDashboard] = useState(false);

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
              <span className="date-d">{events[eventClicked].date}</span>
              <span className="dash-d">-</span>
              <span className="time-d">{events[eventClicked].time}</span>
            </div>
            <h1 className="title">{events[eventClicked].nameEvent}</h1>
            <p className="host-e">{events[eventClicked].host}</p>
            <p className="description-event-e">
              {events[eventClicked].descriptionEvent}
            </p>
            <div className="attendees-capacity-button-container">
              <div className="attendees-capacity-container">
                <PersonIcon className="person-icon" />
                <span className="attendees">
                  {events[eventClicked].attendees}
                </span>
                <span className="of-text-d">of</span>
                <span>{events[eventClicked].capacity}</span>
              </div>
              <Button variant="contained" className="button-event-detail">
                {events[eventClicked].stateEvent}
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
