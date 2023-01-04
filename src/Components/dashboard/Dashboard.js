import { useState } from "react";
import { Navigate } from "react-router-dom";

import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import { handleButtonEvent } from "../../utils";
import "./dashboardStyles.scss";

const Dashboard = () => {
  const [goToEditEvent, setGoToEditEvent] = useState(false);
  const [eventToEdit, setEventToEdit] = useState("");
  const [eventsList, setEventList] = useState(
    JSON.parse(localStorage.getItem("Events"))
  );

  if (eventsList === null) {
    return;
  }

  const displayEvents = eventsList.map((element, index) => {
    return (
      <div key={index} className={`element-${index} element`}>
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
            <PersonIcon className="" />
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
  });

  if (goToEditEvent) {
    return <Navigate to="/editEvent" state={{ eventToEdit }} />;
  } else {
    return (
      <div className="event-container">
        <div className="container-dashboard">
          <div className="box-event-view-row">{displayEvents}</div>;
        </div>
      </div>
    );
  }
};

export default Dashboard;
