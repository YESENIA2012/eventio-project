import { Button, TextField } from "@mui/material";
import React, { useState, Fragment } from "react";
import Image from "../ImageContainer";
import { makeStyles } from "tss-react/mui";

const styles = makeStyles()((theme) => {
  return {
    textFieldStyle: {
      marginBottom: 14,
    },
    borderColor: {
      borderBottomColor: "rgb(179, 175, 177)",
    },
  };
});

const Login = () => {
  const [messageSignIn, setMessageSignIn] = useState(
    "Enter your detalls below."
  );

  const { classes } = styles();

  return (
    <Fragment>
      <div className="login">
        <Image />
        <div className="section-login">
          <div className="sign-in-button">
            <span>Don’t have account?</span>
            <button>SIGN UP</button>
          </div>
          <div className="title-and-message">
            <h1 className="title-login">Sing in to Eventio.</h1>
            <p className="message-login">{messageSignIn}</p>
          </div>
          <form className="form-login">
            <TextField
              id="textfield"
              label="Email"
              variant="standard"
              type="email"
              className={classes.textFieldStyle}
              InputLabelProps={{ className: "textfield-label" }}
              name="email"
              sx={{
                "& .MuiInputLabel-root": {},
                borderBottom: "1px solid rgb(179, 175, 177)",
              }}
              InputProps={{ disableUnderline: true }}
            ></TextField>
            <TextField
              id="textfield"
              label="Password"
              variant="standard"
              className={classes.textFieldStyle}
              InputLabelProps={{ className: "textfield-label" }}
              name="password"
              sx={{
                "& .MuiInputLabel-root": {},
                borderBottom: "1px solid rgb(179, 175, 177)",
              }}
              InputProps={{ disableUnderline: true }}
            ></TextField>
            <Button className="button-login" variant="contained">
              SIGN IN
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
