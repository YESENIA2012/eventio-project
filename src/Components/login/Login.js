import React, { useState, Fragment } from "react";
import { Link, Navigate } from "react-router-dom";

import { Button, TextField, InputAdornment } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { VisibilityOff } from "@mui/icons-material";

import Image from "../image/ImageContainer";
import "./styleLogin.scss";

const styles = makeStyles()((theme) => {
  return {
    textFieldStyle: {
      marginBottom: 14,
    },
  };
});

const Login = () => {
  const [messageSignIn, setMessageSignIn] = useState({
    text: "Enter your detalls below.",
    messageColor: { color: "rgb(150, 157, 166)" },
    borderBottonStyle: { borderBottom: "1px solid rgb(179, 175, 177)" },
  });

  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { classes } = styles();

  const passwordAndUsernameNotMatchMessage = () => {
    setMessageSignIn({
      text: "Oops! That email and password combination is not valid.",
      messageColor: { color: "rgb(237, 85, 151)" },
      borderBottonStyle: { borderBottom: "1px solid rgb(237, 85, 151)" },
    });
  };

  const UsernameNotExistMessage = () => {
    setMessageSignIn({
      text: "Oops! Username does not exist",
      messageColor: { color: "rgb(237, 85, 151)" },
      borderBottonStyle: { borderBottom: "1px solid rgb(237, 85, 151)" },
    });
  };

  const processLogin = () => {
    let isLoggedInVar = false;

    const informationUser = JSON.parse(localStorage.getItem("userInformation"));

    if (informationUser === null) {
      UsernameNotExistMessage();
      return;
    } else {
      informationUser.forEach((element) => {
        if (element.email !== emailText || element.password !== passwordText) {
          passwordAndUsernameNotMatchMessage();
        } else if (
          emailText === element.email &&
          passwordText === element.password
        ) {
          isLoggedInVar = true;
        } else {
          UsernameNotExistMessage();
        }
      });
    }

    setIsLoggedIn(isLoggedInVar);
  };

  if (isLoggedIn) {
    return <Navigate to="dashboard" />;
  }

  return (
    <Fragment>
      <div className="login">
        <Image />
        <section className="section-login">
          <div className="nav-container">
            <nav className="sign-in-link">
              <span>Don’t have account?</span>
              <Link to="sign-up" className="link-s">
                SIGN UP
              </Link>
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
                borderBottom: messageSignIn.borderBottonStyle,
              }}
              InputProps={{ disableUnderline: true }}
              onChange={(e) => {
                setEmailText(e.target.value);
              }}
              value={emailText}
            ></TextField>
            <TextField
              id="Password"
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
                borderBottom: messageSignIn.borderBottonStyle,
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
};

export default Login;
