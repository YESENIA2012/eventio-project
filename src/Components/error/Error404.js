import { useState } from "react";
import { Navigate } from "react-router-dom";

import { Button } from "@mui/material";

import Image from "../image/ImageContainer";
import "./error404Styles.scss";

const Error404 = () => {
  const [goToCreateCount, setGoCreateAccount] = useState(false);
  const [goToDashboard, setGoToDashboard] = useState(false);

  if (goToCreateCount) {
    return <Navigate to="/sign-up" />;
  } else if (goToDashboard) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <div className="error-component-container">
        <Image />
        <div className="error-container">
          <div className="link-container">
            <nav className="sign-up-link">
              <span>Don’t have account?</span>
              <span
                onClick={() => {
                  setGoCreateAccount(true);
                }}
                className="link-sign-up"
              >
                SIGN UP
              </span>
            </nav>
          </div>
          <div className="error-text">
            <h1 className="title-error">404 Error - page not found</h1>
            <p className="paragraph-error">
              Seems like Darth Vader just hits our website and drops it down.
              <br />
              Please press the refresh button and everything should be fine
              again.
            </p>
            <Button
              variant="contained"
              className="refresh-button"
              onClick={() => {
                setGoToDashboard(true);
              }}
            >
              REFRESH
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default Error404;
