const messageColor = { color: "rgb(237, 85, 151)" };
const failBorderBotton = { borderBottom: "1px solid rgb(237, 85, 151)" };

const messageSignInStyle = {
  text: "Enter your detalls below.",
  messageColor: { color: "rgb(150, 157, 166)" },
  failBorderBotton: { borderBottom: "1px solid rgb(179, 175, 177)" },
};

const failedLoginMessageStyle = {
  text: "Oops! That email or password combination is not valid.",
  messageColor,
  failBorderBotton,
};

const userDoesNotExistsMessageStyle = {
  text: "Oops! User does not exist",
  messageColor,
  failBorderBotton,
};

const messageInputStyles = {
  text:"Please enter all fields",
  messageColor,
  failBorderBotton,
}

export {
  messageSignInStyle,
  failedLoginMessageStyle,
  userDoesNotExistsMessageStyle,
  messageInputStyles
};
