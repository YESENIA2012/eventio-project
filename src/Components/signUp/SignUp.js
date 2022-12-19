import { Fragment, useState } from "react";
import { Navigate } from "react-router-dom";

import { Button, TextField } from "@mui/material";
import { makeStyles } from "tss-react/mui";

import Image from "../image/ImageContainer";
import "./styleSignUp.scss";

const styles = makeStyles()((theme) => {
  return {
    textFieldStyle: {
      marginBottom: 14,
    },
  };
});

const SignUp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logInAccount, setLogInAccount] = useState(false);
  const [nameUser, setNameUser] = useState("");
  const [lastNameUser, setLastNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [repeatPasswordUser, setRepeatPasswordUser] = useState("");
  const [messageSignUp, setMessageSignUp] = useState({
    text: "Enter your detalls below.",
    messageColor: { color: "rgb(150, 157, 166)" },
  });
  const { classes } = styles();

  const enterDashboardFunction = () => {
    let isLoggedInVar = false;
    const userInformation = JSON.parse(localStorage.getItem("userInformation"));

    if (userInformation !== null && userInformation.email === emailUser) {
      theUserExistsMessage();
      isLoggedInVar = false;
    } else if (passwordUser === repeatPasswordUser && passwordUser !== "") {
      saveInformationUser();
      isLoggedInVar = true;
    } else {
      passWordNotMatchMessage();
      isLoggedInVar = false;
    }

    setIsLoggedIn(isLoggedInVar);
  };

  const theUserExistsMessage = () => {
    setMessageSignUp({
      text: "The user already exists. Log In.",
      messageColor: { color: "rgb(237, 85, 151)" },
    });
  };

  const passWordNotMatchMessage = () => {
    setMessageSignUp({
      text: "Passwords do not match.",
      messageColor: { color: "rgb(237, 85, 151)" },
    });
  };

  const saveInformationUser = () => {
    let informationUser = null;

    informationUser = {
      name: nameUser,
      lastName: lastNameUser,
      email: emailUser,
      password: passwordUser,
    };

    localStorage.setItem("userInformation", JSON.stringify(informationUser));
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  } else if (logInAccount) {
    return <Navigate to="/" />;
  } else {
    return (
      <Fragment>
        <div className="sign-up">
          <Image />
          <section className="section-sign-up">
            <div className="login-container-nav">
              <nav className="login-link">
                <span>Already have an account?</span>
                <span
                  to="/"
                  className="link-l"
                  onClick={() => {
                    setLogInAccount(true);
                  }}
                >
                  SIGN IN
                </span>
              </nav>
            </div>
            <div className="title-and-message">
              <h1 className="title-sign-up">Get started absolutely free.</h1>
              <p className="message-sign-up" style={messageSignUp.messageColor}>
                {messageSignUp.text}
              </p>
            </div>
            <form className="form-sign-up">
              <TextField
                className={classes.textFieldStyle}
                label="First name"
                variant="standard"
                type="text"
                InputLabelProps={{ className: "textfield-label" }}
                name="Name"
                sx={{
                  "& .MuiInputLabel-root": {},
                  borderBottom: "1px solid rgb(179, 175, 177)",
                }}
                InputProps={{ disableUnderline: true }}
                onChange={(e) => {
                  setNameUser(e.target.value);
                }}
                value={nameUser}
              ></TextField>
              <TextField
                label="Last name"
                variant="standard"
                type="text"
                className={classes.textFieldStyle}
                InputLabelProps={{ className: "textfield-label" }}
                name="Last name"
                sx={{
                  "& .MuiInputLabel-root": {},
                  borderBottom: "1px solid rgb(179, 175, 177)",
                }}
                InputProps={{ disableUnderline: true }}
                onChange={(e) => {
                  setLastNameUser(e.target.value);
                }}
                value={lastNameUser}
              ></TextField>
              <TextField
                label="Email"
                variant="standard"
                type="email"
                className={classes.textFieldStyle}
                InputLabelProps={{ className: "textfield-label" }}
                name="Email"
                sx={{
                  "& .MuiInputLabel-root": {},
                  borderBottom: "1px solid rgb(179, 175, 177)",
                }}
                InputProps={{ disableUnderline: true }}
                onChange={(e) => {
                  setEmailUser(e.target.value);
                }}
                value={emailUser}
              ></TextField>
              <TextField
                label="Password"
                type="password"
                variant="standard"
                className={classes.textFieldStyle}
                InputLabelProps={{ className: "textfield-label" }}
                name="Password"
                sx={{
                  "& .MuiInputLabel-root": {},
                  borderBottom: "1px solid rgb(179, 175, 177)",
                }}
                InputProps={{ disableUnderline: true }}
                onChange={(e) => {
                  setPasswordUser(e.target.value);
                }}
                value={passwordUser}
              ></TextField>
              <TextField
                className={classes.textFieldStyle}
                type="password"
                label="Repeat password"
                variant="standard"
                InputLabelProps={{ className: "textfield-label" }}
                name="repeatPassword"
                sx={{
                  "& .MuiInputLabel-root": {},
                  borderBottom: "1px solid rgb(179, 175, 177)",
                }}
                InputProps={{ disableUnderline: true }}
                onChange={(e) => {
                  setRepeatPasswordUser(e.target.value);
                }}
                value={repeatPasswordUser}
              ></TextField>
              <Button
                className="button-sign-up"
                onClick={enterDashboardFunction}
              >
                SIGN UP
              </Button>
            </form>
          </section>
        </div>
      </Fragment>
    );
  }
};

export default SignUp;
