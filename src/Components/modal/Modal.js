import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

import "./modalStyle.scss";
import { UserContext } from "../globalState";
import { isLoggedOut } from "../../utils";

const Modal = () => {
  const { logout, user } = useContext(UserContext);
  const [goToProfile, setGoToProfile] = useState(false);

  if (isLoggedOut(user)) {
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
            logout();
          }}
        >
          Sign Out
        </span>
      </nav>
    );
  }
};

export default Modal;
