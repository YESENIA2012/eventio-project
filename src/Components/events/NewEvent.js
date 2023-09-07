import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import CloseIcon from "@mui/icons-material/Close";
import { Button, TextField } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import {
  styles,
  isLoggedOut,
  request
} from "../../utils";

import "./newEventStyle.scss";
import { UserContext } from "../globalState";

const NewEvent = () => {
  const { user } = useContext(UserContext);
  const [goToDashboard, setGoToDashboard] = useState(false);
  const [titleEvent, setTitleEvent] = useState("");
  const [descriptionEvent, setDescriptionEvent] = useState("");
  const [dateEvent, setDateEvent] = useState(dayjs());
  const [timeEvent, setTimeEvent] = useState(dayjs().format("h:mm A"));
  const [capacityPeopleEvent, setCapacityPeopleEvent] = useState("");
  const [errorInfoMessage, setErrorInfoMessage] = useState(false);
  const [message, setMessage] = useState({
    text: "Enter details below.",
    messageColor: { color: "rgb(150, 157, 166)" },
  });

  const dateFormats = {
    time: "h:mm A",
    customDate: "ddd MMM DD YYYY",
  };
  const { classes } = styles();

  dayjs.locale("en");

  useEffect(() => {
    if (errorInfoMessage) {
      setMessage({
        text: "Enter details below.",
        messageColor: { color: "rgb(150, 157, 166)" },
      });
      setErrorInfoMessage(false);
    }
  }, [titleEvent, descriptionEvent, dateEvent, timeEvent, capacityPeopleEvent]);

  const saveNewEventInLocalStorage = async () => {
    try {
      let dateToSave = dateEvent;
      dateToSave = dayjs(dateToSave).format(dateFormats.customDate);

      const body = {
        userId:  user.idUser,
        title: titleEvent,
        description: descriptionEvent,
        event_date: dateToSave,
        event_time: timeEvent,
        capacity: capacityPeopleEvent,
      }
      const endpoint = "events/"
      const method = "POST"
      await request(endpoint, method, body)

      setTitleEvent("");
      setDescriptionEvent("");
      setDateEvent(dayjs());
      setTimeEvent(dayjs().format("h:mm A"));
      setCapacityPeopleEvent("");

    } catch (error) {
      if (error.message.includes("empty")){
        setMessage({
          text: "Please fill in the blanks.",
          messageColor: { color: "rgb(237, 85, 151)" },
        });
        setErrorInfoMessage(true)
      }
    }
  };

  if (isLoggedOut(user)) {
    return <Navigate to="/" />;
  } else if (goToDashboard) {
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
              borderBottom: "1px solid rgb(179, 175, 177)",
            }}
            InputProps={{ disableUnderline: true }}
            InputLabelProps={{ className: "text-label" }}
            onChange={(e) => {
              setDescriptionEvent(e.target.value);
            }}
            value={descriptionEvent}
          ></TextField>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            dateFormats={dateFormats}
          >
            <MobileDatePicker
              label="Date"
              className={classes.textFieldStyle}
              value={dateEvent}
              onChange={(date) => {
                setDateEvent(dayjs(date));
              }}
              format={dateFormats.customDate}
              sx={{
                borderBottom: "1px solid rgb(179, 175, 177)",
              }}
              InputProps={{ disableUnderline: false }}
              InputLabelProps={{ className: "text-label" }}
            />
          </LocalizationProvider>
          <TextField
            label="Time"
            type="text"
            variant="standard"
            className={classes.textFieldStyle}
            sx={{
              borderBottom: "1px solid rgb(179, 175, 177)",
            }}
            InputProps={{
              disableUnderline: true,
            }}
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
