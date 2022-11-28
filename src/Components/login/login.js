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

const Login = () => {
  // hooks
  const [messageSignIn, setMessageSignIn] = useState({
    text: "Enter your detalls below.",
    mesaggeColor: { color: "rgb(150, 157, 166)" },
    borderBottonStyle: { borderBottom: "1px solid rgb(179, 175, 177)" },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [intoDashboard, setIntoDashboard] = useState(false);
  const { classes } = styles();

  //funtions
  const changeMessage = () => {
    setMessageSignIn({
      text: "Oops! That email and password combination is not valid.",
      mesaggeColor: { color: "rgb(237, 85, 151)" },
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

    if (emailInfo !== "gyesenia173@gmail.com" || passwordInfo !== "dilan") {
      changeMessage();
    } else if (
      emailInfo === "gyesenia173@gmail.com" &&
      passwordInfo === "dilan"
    ) {
      intoDisboardSet = true;
      console.log("inicio sessión");
    }

    setIntoDashboard(intoDisboardSet);
  };

  if (intoDashboard) {
    return <DashboardComponent />;
  } else {
    return (
      <Fragment>
        <div className="login">
          <Image />
          <section className="section-login">
            <nav className="sign-in-link">
              <span>Don’t have account?</span>
              <Link to="sign-up" className="link-s">
                SIGN UP
              </Link>
            </nav>
            <div className="title-and-message">
              <h1 className="title-login">Sing in to Eventio.</h1>
              <p className="message-login" style={messageSignIn.mesaggeColor}>
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
