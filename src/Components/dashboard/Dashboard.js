import { useState } from "react";
import { Link } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button } from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { mockedEvents } from "../../utils";
import EventClickedComponent from "../eventClicked/EventClcked";
import "./dashboardStyles.scss";

const DashboardComponent = (props) => {
  const { textAvatar, userName } = props;
  const [viewEvents, setViewEvents] = useState(true);
  const [eventClicked, setEventClicked] = useState("");
  const [hiddenDashboard, setHiddenDashboard] = useState(false);
  const [events, setEvents] = useState([...mockedEvents]);

  const handleEventClicked = (e) => {
    let hiddenDashboard = false;
    let elementClassName = e.target.className;
    let classNamePosition = elementClassName.split(" ");
    let eventId = classNamePosition[0].split("-");
    let elementClickedId = Number(eventId[1]);

    if (
      elementClickedId === undefined ||
      isNaN(elementClickedId) ||
      elementClickedId === ""
    ) {
      return;
    } else {
      hiddenDashboard = true;
    }

    setHiddenDashboard(hiddenDashboard);
    setEventClicked(elementClickedId);
  };

  const changeToDashboard = () => {
    setHiddenDashboard(false);
  };

  const items = events.map((element, index) => {
    const handleButtonEvent = (e) => {
      let textButton = e.target.innerText;

      if (textButton === "EDIT") {
        console.log("Editar el evento");
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
        onClick={(e) => handleEventClicked(e)}
      >
        <spam className="date-time">{element.dateAndTime}</spam>
        <h4 className="title-event">{element.nameEvent}</h4>
        <p className="p-host">{element.host}</p>
        <p className="description-event">{element.descriptionEvent}</p>
        <div className="button-span-container">
          <span className="attendees">
            <PersonIcon className={viewEvents ? "" : "icon-hide"} />
            <span>{element.attendees}</span>
          </span>
          <Button
            variant="contained"
            className="button-event"
            onClick={handleButtonEvent}
          >
            {element.buttonEvent}
          </Button>
        </div>
      </div>
    );
  });

  return (
    <div className="event-container">
      <section className="user-name-container">
        <div
          className={hiddenDashboard ? "back-button" : "back-button-hidden"}
          onClick={changeToDashboard}
        >
          <ArrowBackIcon />
          <span>Back to events</span>
        </div>
        <Avatar>{textAvatar}</Avatar>
        <span className="user-name-text">{userName}</span>
      </section>
      <div
        className={
          hiddenDashboard ? "container-dashboard-hidden" : "container-dashboard"
        }
      >
        <div className="nav-icon-container">
          <nav className="nav-link-container">
            <Link to="dashboard" className="link-1">
              All events
            </Link>
            <Link to="dashboard" className="link-2">
              Future Events
            </Link>
            <Link to="dashboard" className="link-3">
              Past Events
            </Link>
          </nav>
          <div className="view-icon">
            <ViewModuleIcon
              onClick={() => {
                setViewEvents(true);
              }}
            />
            <ViewStreamIcon
              onClick={() => {
                setViewEvents(false);
              }}
            />
          </div>
        </div>
        <div
          className={
            viewEvents ? "box-event-view-row" : "box-event-view-column"
          }
        >
          {items}
        </div>
        ;
        <div className="icon-add-container">
          <AddCircleIcon className="icon-add" />
        </div>
      </div>

      <EventClickedComponent
        eventClicked={eventClicked}
        hiddenEventsList={hiddenDashboard}
      />
    </div>
  );
};

export default DashboardComponent;
