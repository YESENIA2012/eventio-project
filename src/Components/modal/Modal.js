import { useState } from "react";
import { Navigate } from "react-router-dom";

import "./modalStyle.scss";
import { signOffFunction } from "../../utils";

const Modal = () => {
  const [goToProfile, setGoToProfile] = useState(false);
  const [signOut, setSignOut] = useState(false);

  if (signOut) {
    return <Navigate to="/" />;
  } else if (goToProfile) {
    return <Navigate to="/profile" />;
  } else {
    return (
      <nav className="profile-sign-out-container">
        <span
          className="profile-link"
          onClick={() => {
            setGoToProfile(true);
          }}
        >
          View Profile
        </span>
        <span
          className="sign-out-button"
          onClick={() => {
            setSignOut(true);
            signOffFunction();
          }}
        >
          Sign Out
        </span>
      </nav>
    );
  }
};

export default Modal;
