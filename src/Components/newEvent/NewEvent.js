import { Navigate } from "react-router-dom";
import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";

const NewEvent = () => {
  const [goToDashboard, setGoToDashboard] = useState(false);

  if (goToDashboard) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <div className="container-new-event">
        <div
          className="dashboard-redirect-container"
          to="dashboard"
          onClick={() => {
            setGoToDashboard(true);
          }}
        >
          <CloseIcon className="close-icon" />
          <span>Close</span>
        </div>
        <div>CREATE A NEW EVENT</div>
      </div>
    );
  }
};

export default NewEvent;
