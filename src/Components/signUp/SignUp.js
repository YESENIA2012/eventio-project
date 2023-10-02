import { Fragment, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Button, TextField, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { VisibilityOff } from "@mui/icons-material";
import { UserContext } from "../globalState";
import Image from "../image/ImageContainer";
import { styles, request } from "../../utils";
import {
  textFieldBorderStyle,
  userExistsMessageStyle,
  messagePassWordNotMatchStyles,
  messageSignupStyles,
  messageInputStyles
} from "./materialStylesSignUp";
import "./styleSignUp.scss";

const SignUp = () => {
  const { setLoginData, user } = useContext(UserContext);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [nameUser, setNameUser] = useState("");
  const [lastNameUser, setLastNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [repeatPasswordUser, setRepeatPasswordUser] = useState("");
  const [messageSignUp, setMessageSignUp] = useState(messageSignupStyles);
  const [errorInformationEntered, setErrorInformationEntered] = useState(false);
  const { classes } = styles();

  useEffect(() => {
    if (errorInformationEntered) {
      setMessageSignUp(messageSignupStyles);
      setErrorInformationEntered(false);
    }
  }, [emailUser, passwordUser, repeatPasswordUser]);

  const signUpUser = async () => {
    const isinfoValid = validateInformation();
    if (isinfoValid) {
      await registerUser();
    }
  };

  const validateInformation = () => {
    if (passwordUser !== repeatPasswordUser) {
      setMessageSignUp(messagePassWordNotMatchStyles);
      setErrorInformationEntered(true);
      return false;
    }
    return true
  };

  const registerUser = async () => {
     try {
      const body = {
        firstName: nameUser,
        lastName: lastNameUser,
        email: emailUser,
        password: passwordUser,
      }
      const endpoint = "auth/signup"
      const method = "POST"
      const userCreated = await request(endpoint, method, body)

      setLoginData({
        name: userCreated.firstName,
        lastName: userCreated.lastName,
        email: userCreated.email,
        idUser: userCreated.id,
        isLoggedIn: true,
      });
    } catch (error) {   
      console.log( error.message )   
      if (error.message === "This user already exists") {
        setMessageSignUp(userExistsMessageStyle);
      } else if (error.message.includes("empty")){
        setMessageSignUp(messageInputStyles);
      }
      setErrorInformationEntered(true);
    } 
  };

  if (user.isLoggedIn) {
    return <Navigate to="/dashboard" />;
  } else if (redirectToLogin) {
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
                  className="link-l"
                  onClick={() => {
                    setRedirectToLogin(true);
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
                sx={textFieldBorderStyle}
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
                sx={textFieldBorderStyle}
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
                sx={textFieldBorderStyle}
                InputProps={{ disableUnderline: true }}
                onChange={(e) => {
                  setEmailUser(e.target.value);
                }}
                value={emailUser}
              ></TextField>
              <TextField
                label="Password"
                variant="standard"
                type={showPassword ? "text" : "password"}
                className={classes.textFieldStyle}
                InputLabelProps={{ className: "textfield-label" }}
                name="Password"
                sx={textFieldBorderStyle}
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
                onChange={(e) => {
                  setPasswordUser(e.target.value);
                }}
                value={passwordUser}
              ></TextField>
              <TextField
                className={classes.textFieldStyle}
                label="Repeat password"
                type={showRepeatPassword ? "text" : "password"}
                variant="standard"
                InputLabelProps={{ className: "textfield-label" }}
                name="repeatPassword"
                sx={textFieldBorderStyle}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      {showRepeatPassword ? (
                        <VisibilityIcon
                          className="icon-visibility"
                          onClick={() => {
                            setShowRepeatPassword(!showRepeatPassword);
                          }}
                        />
                      ) : (
                        <VisibilityOff
                          className="icon-visibility"
                          onClick={() => {
                            setShowRepeatPassword(!showRepeatPassword);
                          }}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setRepeatPasswordUser(e.target.value);
                }}
                value={repeatPasswordUser}
              ></TextField>
              <Button className="botton-sign-up" onClick={signUpUser}>
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
