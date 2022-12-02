import { useState } from "react";
import { Link } from "react-router-dom";

import { Avatar, Button } from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import eventsInformation from "../../utils";
import "./dashboardStyles.scss";

const DashboardComponent = (props) => {
  //Hooks
  const [viewEvents, setViewEvents] = useState(true);

  //functions
  const changeViewEventsToColumn = () => {
    setViewEvents(false);
  };
  const changeViewEventsToRow = () => {
    setViewEvents(true);
  };
  const items = eventsInformation.map((element, index) => {
    return (
      <div
        key={index}
        className={
          viewEvents
            ? `element-${index} element`
            : `element-${index} element-column`
        }
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
          <Button variant="contained" className="button-event">
            {element.buttonEvent}
          </Button>
        </div>
      </div>
    );
  });

  return (
    <div className="event-container">
      <section className="user-name">
        <Avatar>{props.textAvatar}</Avatar>
        <span className="username">{props.userName}</span>
      </section>
      <div className="nav-icon-container">
        <nav className="nav-container">
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
          <ViewModuleIcon onClick={changeViewEventsToRow} />
          <ViewStreamIcon onClick={changeViewEventsToColumn} />
        </div>
      </div>
      <div
        className={viewEvents ? "box-event-view-row" : "box-event-view-column"}
      >
        {items}
      </div>
      ;
      <div className="icon-add-container">
        <AddCircleIcon className="icon-add" />
      </div>
    </div>
  );
};

export default DashboardComponent;
