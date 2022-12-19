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
  const [intoDashboard, setIntoDashboard] = useState(false);
  const [textAvatar, setTextAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const { classes } = styles();

  const enterDashboardFunction = (e) => {
    e.preventDefault();
    let intoDasboardSet = false;
    let name = document.querySelector("#Name").value;
    let lastName = document.querySelector("#LastName").value;
    let password = document.querySelector("#Password").value;
    let repeatPassword = document.querySelector("#repeatPassword").value;
    let email = document.querySelector("#email").value;

    if (password === repeatPassword && password !== "") {
      intoDasboardSet = true;
    }

    saveInformationUser(name, lastName, email, password);
    setIntoDashboard(intoDasboardSet);
  };

  const saveInformationUser = (name, lastName, email, password) => {
    let arrayInformationUser = [];

    let item = {
      name: name,
      lastName: lastName,
      email: email,
      password: password,
    };

    arrayInformationUser.unshift(item);

    localStorage.setItem(
      "userInformation",
      JSON.stringify(arrayInformationUser)
    );

    drawTextAvatarAndNameUser();
  };

  const drawTextAvatarAndNameUser = () => {
    const informationUser = JSON.parse(localStorage.getItem("userInformation"));

    let firsLetterName = informationUser[0].name[0];
    let firstLetterLastName = informationUser[0].lastName[0];
    let letterAvatar = `${firsLetterName} ${firstLetterLastName}`;
    let userName = `${informationUser[0].name} ${informationUser[0].lastName}`;

    setTextAvatar(letterAvatar);
    setUserName(userName);
  };

  if (intoDashboard) {
    return <DashboardComponent textAvatar={textAvatar} userName={userName} />;
  } else {
    return (
      <Fragment>
        <div className="sign-up">
          <Image />
          <section className="section-sign-up">
            <div className="login-container-nav">
              <nav className="login-link">
                <span>Already have an account?</span>
                <Link to="/" className="link-l">
                  SIGN IN
                </Link>
              </nav>
            </div>

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
              <Button
                className="botton-sign-up"
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
