import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button } from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { paintAvatarAndName } from "../../utils";
import "./dashboardStyles.scss";

const Dashboard = () => {
  const [viewEvents, setViewEvents] = useState(true);
  const [goToEditEvent, setGoToEditEvent] = useState(false);
  const [eventToEdit, setEventToEdit] = useState("");

  const eventsList = JSON.parse(localStorage.getItem("Events"));

  const goToEditEventFunction = (e) => {
    let nameClassAtTheElement = e.target.className;
    let arrayClass = nameClassAtTheElement.split(" ");
    let eventToEdit = Number(arrayClass[12]);

    if (
      eventToEdit === undefined ||
      eventToEdit === null ||
      isNaN(eventToEdit)
    ) {
      return;
    } else {
      setGoToEditEvent(true);
    }

    setEventToEdit(eventToEdit);
  };

  if (eventsList === null) {
    return;
  }

  const displayEvents = eventsList.map((element, index) => {
    const handleButtonEvent = (e) => {
      let textButton = e.target.innerText;

      if (textButton === "EDIT") {
        goToEditEventFunction(e);
      } else if (textButton === "JOIN") {
        e.target.innerText = "LEAVE";
      } else {
        e.target.innerText = "JOIN";
      }
    };

    return (
      <div
        key={index}
        className={
          viewEvents
            ? `element-${index} element`
            : `element-${index} element-column`
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
              handleButtonEvent(e);
            }}
          >
            {element.stateEvent}
          </Button>
        </div>
      </div>
    );
  });

  if (goToEditEvent) {
    return <Navigate to="/EditEvent" state={{ eventToEdit }} />;
  } else {
    return (
      <div className="event-container">
        <div className="container-dashboard">
          <div
            className={
              viewEvents ? "box-event-view-row" : "box-event-view-column"
            }
          >
            {displayEvents}
          </div>
          ;
        </div>
      </div>
    );
  }
};

export default Dashboard;
