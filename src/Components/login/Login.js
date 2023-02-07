import React, { useState, Fragment, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";

import { Button, TextField, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { VisibilityOff } from "@mui/icons-material";

import Image from "../image/ImageContainer";

import {
  messageSignInStyle,
  failedLoginMessageStyle,
  userDoesNotExistsMessageStyle,
} from "./materialStyles";

import { styles, getFromLocalStorage } from "../../utils";
import "./styleLogin.scss";

const Login = () => {
  const [messageSignIn, setMessageSignIn] = useState(messageSignInStyle);
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [goCreateAccount, setGoCreateAccount] = useState(false);
  const [errorInformationEntered, setErrorInformationEntered] = useState(false);
  const prevEmailValue = useRef("");
  const prevPasswordValue = useRef("");

  const { classes } = styles();

  useEffect(() => {
    const informationUser = getFromLocalStorage();
    if (informationUser && informationUser.isLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const processLogin = () => {
    prevEmailValue.current = emailText;
    prevPasswordValue.current = passwordText;

    const informationUser = getFromLocalStorage();
    if (!informationUser) {
      setMessageSignIn(userDoesNotExistsMessageStyle);
      setErrorInformationEntered(true);
      return;
    }

    if (emailText === "" && passwordText === "") {
      setMessageSignIn(messageSignInStyle);
    } else if (
      informationUser.email === emailText &&
      informationUser.password !== passwordText
    ) {
      setMessageSignIn(failedLoginMessageStyle);
      setErrorInformationEntered(true);
    } else if (
      emailText === informationUser.email &&
      passwordText === informationUser.password
    ) {
      setIsLoggedIn(true);
    } else if (informationUser.email !== emailText) {
      setMessageSignIn(userDoesNotExistsMessageStyle);
      setErrorInformationEntered(true);
    }
  };

  const changeMessageError = () => {
    if (
      (prevEmailValue.current !== emailText && prevEmailValue.current !== "") ||
      (prevPasswordValue.current !== passwordText &&
        prevPasswordValue.current !== "")
    ) {
      setMessageSignIn(messageSignInStyle);
      setErrorInformationEntered(false);
    }
  };

  if (errorInformationEntered) {
    changeMessageError();
  }

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  } else if (goCreateAccount) {
    return <Navigate to="/sign-up" />;
  } else {
    return (
      <Fragment>
        <div className="login">
          <Image />
          <section className="section-login">
            <div className="nav-container">
              <nav className="sign-in-link">
                <span>Don’t have account?</span>
                <span
                  onClick={() => {
                    setGoCreateAccount(true);
                  }}
                  className="link-s"
                >
                  SIGN UP
                </span>
              </nav>
            </div>
            <div className="title-and-message">
              <h1 className="title-login">Sing in to Eventio.</h1>
              <p className="message-login" style={messageSignIn.messageColor}>
                {messageSignIn.text}
              </p>
            </div>
            <form className="form-login">
              <TextField
                id="Email"
                label="Email"
                variant="standard"
                type="email"
                className={classes.textFieldStyle}
                InputLabelProps={{ className: "textfield-label" }}
                name="Email"
                sx={{
                  "& .MuiInputLabel-root": {},
                  borderBottom: messageSignIn.failBorderBotton,
                }}
                InputProps={{ disableUnderline: true }}
                onChange={(e) => {
                  setEmailText(e.target.value);
                }}
                value={emailText}
              ></TextField>
              <TextField
                label="Password"
                variant="standard"
                type={showPassword ? "text" : "password"}
                className={classes.textFieldStyle}
                InputLabelProps={{
                  className: "textfield-label",
                }}
                name="Password"
                sx={{
                  "& .MuiInputLabel-root": {},
                  borderBottom: messageSignIn.failBorderBotton,
                }}
                onChange={(e) => {
                  setPasswordText(e.target.value);
                }}
                value={passwordText}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword ? (
                        <VisibilityIcon
                          className="icon-visibility"
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        />
                      ) : (
                        <VisibilityOff
                          className="icon-visibility"
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <Button
                className="button-login"
                variant="contained"
                onClick={processLogin}
              >
                SIGN IN
              </Button>
            </form>
          </section>
        </div>
      </Fragment>
    );
  }
};

export default Login;
