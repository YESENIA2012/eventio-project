import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { Button, TextField } from "@mui/material";
import { makeStyles } from "tss-react/mui";

import Image from "../image/ImageContainer";
import "./styleSignUp.scss";

import DashboardComponent from "../dashboard/Dashboard";

const styles = makeStyles()((theme) => {
  return {
    textFieldStyle: {
      marginBottom: 14,
    },
  };
});

const SignUp = () => {
  //hooks
  const [intoDashboard, setIntoDashboard] = useState(false);
  const [textAvatar, setTextAvatar] = useState("");
  const { classes } = styles();
  //functions
  const signUpFunction = (e) => {
    let intoDasboardSet = false;
    e.preventDefault();
    let password = document.querySelector("#Password").value;
    let repeatPassword = document.querySelector("#repeatPassword").value;
    let name = document.querySelector("#Name").value;
    let lastName = document.querySelector("#LastName").value;
    let firsLetterName = name[0];
    let firstLetterLastName = lastName[0];
    let letterAvatar = firsLetterName + firstLetterLastName;

    if (password === repeatPassword) {
      intoDasboardSet = true;
    }

    setIntoDashboard(intoDasboardSet);
    setTextAvatar(letterAvatar);
  };

  if (intoDashboard) {
    return <DashboardComponent textAvatar={textAvatar} />;
  } else {
    return (
      <Fragment>
        <div className="sign-up">
          <Image />
          <section className="section-sign-up">
            <nav className="login-link">
              <span>Already have an account?</span>
              <Link to="/" className="link-l">
                SIGN IN
              </Link>
            </nav>
            <div className="title-and-message">
              <h1 className="title-sign-up">Get started absolutely free.</h1>
              <p className="message-sign-up">Enter your details below.</p>
            </div>
            <form className="form-sign-up">
              <TextField
                className={classes.textFieldStyle}
                id="Name"
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
              ></TextField>
              <TextField
                id="LastName"
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
              ></TextField>
              <TextField
                id="email"
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
              ></TextField>
              <TextField
                id="Password"
                label="Password"
                variant="standard"
                className={classes.textFieldStyle}
                InputLabelProps={{ className: "textfield-label" }}
                name="Password"
                sx={{
                  "& .MuiInputLabel-root": {},
                  borderBottom: "1px solid rgb(179, 175, 177)",
                }}
                InputProps={{ disableUnderline: true }}
              ></TextField>
              <TextField
                className={classes.textFieldStyle}
                id="repeatPassword"
                label="Repeat password"
                variant="standard"
                InputLabelProps={{ className: "textfield-label" }}
                name="repeatPassword"
                sx={{
                  "& .MuiInputLabel-root": {},
                  borderBottom: "1px solid rgb(179, 175, 177)",
                }}
                InputProps={{ disableUnderline: true }}
              ></TextField>
              <Button className="botton-sign-up" onClick={signUpFunction}>
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
