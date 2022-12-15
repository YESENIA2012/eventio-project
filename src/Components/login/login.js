import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";

import { Button, TextField, InputAdornment } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { VisibilityOff } from "@mui/icons-material";

import Image from "../image/ImageContainer";
import "./styleLogin.scss";

import DashboardComponent from "../dashboard/Dashboard";

const styles = makeStyles()((theme) => {
  return {
    textFieldStyle: {
      marginBottom: 14,
    },
  };
});

const Login = (props) => {
  const [messageSignIn, setMessageSignIn] = useState({
    text: "Enter your detalls below.",
    messageColor: { color: "rgb(150, 157, 166)" },
    borderBottonStyle: { borderBottom: "1px solid rgb(179, 175, 177)" },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [intoDashboard, setIntoDashboard] = useState(false);
  const [textAvatar, setTextAvatar] = useState("");
  const [userName, setUserName] = useState("");

  const { classes } = styles();

  const changeMessage = () => {
    setMessageSignIn({
      text: "Oops! That email and password combination is not valid.",
      messageColor: { color: "rgb(237, 85, 151)" },
      borderBottonStyle: { borderBottom: "1px solid rgb(237, 85, 151)" },
    });
  };

  const changeShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const logInFunction = (e) => {
    e.preventDefault();
    let intoDisboardSet = false;
    let emailInfo = document.querySelector("#Email").value;
    let passwordInfo = document.querySelector("#Password").value;

    const informationUser = JSON.parse(localStorage.getItem("userInformation"));

    informationUser.forEach((element) => {
      if (element.email !== emailInfo || element.password !== passwordInfo) {
        changeMessage();
      } else if (
        emailInfo === element.email &&
        passwordInfo === element.password
      ) {
        intoDisboardSet = true;
      }
    });

    setIntoDashboard(intoDisboardSet);
    paintAvatarAndName();
  };

  const paintAvatarAndName = () => {
    const informationUser = JSON.parse(localStorage.getItem("userInformation"));

    let firsLetterName = informationUser[0].name[0];
    let firstLetterLastName = informationUser[0].lastName[0];
    let letterAvatar = `${firsLetterName} ${firstLetterLastName}`;
    let userName = `${informationUser[0].name} ${informationUser[0].lastName}`;

    setTextAvatar(letterAvatar);
    setUserName(userName);
  };

  if (intoDashboard) {
    return;
  } else {
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
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword ? (
                        <VisibilityIcon
                          className="icon-visibility"
                          onClick={changeShowPassword}
                        />
                      ) : (
                        <VisibilityOff
                          className="icon-visibility"
                          onClick={changeShowPassword}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <Button
                className="botton-login"
                variant="contained"
                onClick={logInFunction}
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
