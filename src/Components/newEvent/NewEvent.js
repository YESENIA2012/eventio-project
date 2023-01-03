import { Navigate } from "react-router-dom";
import { useState } from "react";

import { Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { styles } from "../../utils";
import { mockedEventsCopy } from "../../utils";
import "./newEventStyle.scss";

const NewEvent = () => {
  const [goToDashboard, setGoToDashboard] = useState(false);
  const [titleEvent, setTitleEvent] = useState("");
  const [descriptionEvent, setDescriptionEvent] = useState("");
  const [dateEvent, setDateEvent] = useState("");
  const [timeEvent, setTimeEvent] = useState("");
  const [capacityPeopleEvent, setCapacityPeopleEvent] = useState("");
  const [message, setMessage] = useState({
    text: "Enter details below.",
    messageColor: { color: "rgb(150, 157, 166)" },
  });
  const { classes } = styles();

  const saveNewEventInLocalStorage = () => {
    let stateEvent = "EDIT";
    let id = mockedEventsCopy.length;

    if (
      titleEvent === "" ||
      descriptionEvent === "" ||
      dateEvent === "" ||
      timeEvent === "" ||
      capacityPeopleEvent === ""
    ) {
      setMessage({
        text: "Please fill in the blanks.",
        messageColor: { color: "rgb(237, 85, 151)" },
      });
      return;
    } else {
      const informationUser = JSON.parse(
        localStorage.getItem("userInformation")
      );
      let host = `${informationUser.name} ${informationUser.lastName}`;

      mockedEventsCopy.push({
        id: id,
        date: dateEvent,
        time: timeEvent,
        nameEvent: titleEvent,
        host: host,
        descriptionEvent: descriptionEvent,
        attendees: 1,
        capacity: capacityPeopleEvent,
        stateEvent: stateEvent,
      });

      localStorage.setItem("Events", JSON.stringify(mockedEventsCopy));

      setTitleEvent("");
      setDescriptionEvent("");
      setDateEvent("");
      setTimeEvent("");
      setCapacityPeopleEvent("");
    }
  };

  if (goToDashboard) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <div className="container-new-event">
        <div
          className="dashboard-redirect-container"
          to="dashboard"
          onClick={() => {
            setGoToDashboard(true);
          }}
        >
          <CloseIcon className="close-icon" />
          <span>Close</span>
        </div>
        <div className="create-new-event">
          <h3>Create new event</h3>
          <p className="message" style={message.messageColor}>
            {message.text}
          </p>
          <TextField
            label="Title"
            type="text"
            variant="standard"
            className={classes.textFieldStyle}
            sx={{
              "& .MuiInputLabel-root": {},
              borderBottom: "1px solid rgb(179, 175, 177)",
            }}
            InputProps={{ disableUnderline: true }}
            InputLabelProps={{ className: "text-label" }}
            onChange={(e) => {
              setTitleEvent(e.target.value);
            }}
            value={titleEvent}
          ></TextField>
          <TextField
            label="Description"
            type="text"
            variant="standard"
            className={classes.textFieldStyle}
            sx={{
              "& .MuiInputLabel-root": {},
              borderBottom: "1px solid rgb(179, 175, 177)",
            }}
            InputProps={{ disableUnderline: true }}
            InputLabelProps={{ className: "text-label" }}
            onChange={(e) => {
              setDescriptionEvent(e.target.value);
            }}
            value={descriptionEvent}
          ></TextField>
          <TextField
            label="Date"
            type="text"
            variant="standard"
            className={classes.textFieldStyle}
            sx={{
              "& .MuiInputLabel-root": {},
              borderBottom: "1px solid rgb(179, 175, 177)",
            }}
            InputProps={{ disableUnderline: true }}
            InputLabelProps={{ className: "text-label" }}
            onChange={(e) => {
              setDateEvent(e.target.value);
            }}
            value={dateEvent}
          ></TextField>
          <TextField
            label="Time"
            type="text"
            variant="standard"
            className={classes.textFieldStyle}
            sx={{
              "& .MuiInputLabel-root": {},
              borderBottom: "1px solid rgb(179, 175, 177)",
            }}
            InputProps={{ disableUnderline: true }}
            InputLabelProps={{ className: "text-label" }}
            onChange={(e) => {
              setTimeEvent(e.target.value);
            }}
            value={timeEvent}
          ></TextField>
          <TextField
            label="Capacity"
            type="text"
            variant="standard"
            className={classes.textFieldStyle}
            sx={{
              "& .MuiInputLabel-root": {},
              borderBottom: "1px solid rgb(179, 175, 177)",
            }}
            InputProps={{ disableUnderline: true }}
            InputLabelProps={{ className: "text-label" }}
            onChange={(e) => {
              setCapacityPeopleEvent(e.target.value);
            }}
            value={capacityPeopleEvent}
          ></TextField>
          <Button
            variant="contained"
            className="new-event-button"
            onClick={saveNewEventInLocalStorage}
          >
            CREATE NEW EVENT
          </Button>
        </div>
      </div>
    );
  }
};

export default NewEvent;
