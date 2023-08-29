const messageColor = { color: "rgb(237, 85, 151)" };

const textFieldBorderStyle = {
  "& .MuiInputLabel-root": {},
  borderBottom: "1px solid rgb(179, 175, 177)",
};

const userExistsMessageStyle = {
  text: "The user already exists. Log In.",
  messageColor,
};

const messagePassWordNotMatchStyles = {
  text: "Passwords do not match.",
  messageColor,
};

const messageSignupStyles = {
  text: "Enter your detalls below.",
  messageColor: { color: "rgb(150, 157, 166)" },
};

const messageInputStyles = {
  text:"Please enter all fields",
  messageColor,
}

export {
  textFieldBorderStyle,
  userExistsMessageStyle,
  messagePassWordNotMatchStyles,
  messageSignupStyles,
  messageInputStyles
};
