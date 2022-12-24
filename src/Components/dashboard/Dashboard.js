import { useState } from "react";
import { Navigate } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import "./dashboardStyles.scss";

const DashboardComponent = () => {
  const [goToCreateNewEvent, setGoToCreateNewEvent] = useState(false);

  if (goToCreateNewEvent) {
    return <Navigate to="/createEvent" />;
  } else {
    return (
      <div className="event-container">
        <div className="add-new-event-container">
          <AddCircleIcon
            className="add-new-event-button"
            onClick={() => {
              setGoToCreateNewEvent(true);
            }}
          />
          CLICK HERE TO CREATE A NUEW EVENT
        </div>
      </div>
    );
  }
};

export default DashboardComponent;
