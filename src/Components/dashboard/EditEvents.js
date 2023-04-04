import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

import { TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import AvatarUser from "../avatarUser/AvatarUser";
import { styles, getEventsFromLocalStorage } from "../../utils";
import "./styleEditEvents.scss";

const EditEvent = () => {
  const location = useLocation();
  const eventToEdit = location.state.eventToEdit;
  const eventsInLocalStorage = getEventsFromLocalStorage();
  const events = eventsInLocalStorage.events || [];
  const indexEventToEdit = events.findIndex(
    (event) => event.id === eventToEdit
  );
  const event = events[indexEventToEdit];
  const [dateEvent, setDateEvent] = useState(dayjs(event.date));
  const [timeEvent, setTimeEvent] = useState(event.time);
  const [titleEvent, setTitleEvent] = useState(
    events[indexEventToEdit].nameEvent
  );
  const [descriptionEvent, setDescriptionEvent] = useState(
    event.descriptionEvent
  );
  const [capacityPeopleEvent, setCapacityPeopleEvent] = useState(
    event.capacity
  );
  const [itemToDraw, setItemToDraw] = useState("");
  const [backToDashboard, setBackToDashboard] = useState(false);
  const dateFormats = {
    time: "h:mm A",
    customDate: "ddd MMM DD YYYY",
  };
  const { classes } = styles();
  dayjs.locale("en");

  useEffect(() => {
    setItemToDraw(drawEventToEdit);
  }, [itemToDraw]);

  const saveInformationEventEdit = () => {
    const informationUser = JSON.parse(localStorage.getItem("userInformation"));
    let host = `${informationUser.name} ${informationUser.lastName}`;
    let dateToSave = dateEvent;
    dateToSave = dayjs(dateToSave).format(dateFormats.customDate);

    event.date = dateToSave;
    event.time = timeEvent;
    event.nameEvent = titleEvent;
    event.host = host;
    event.descriptionEvent = descriptionEvent;
    event.capacity = capacityPeopleEvent;

    localStorage.setItem("Events", JSON.stringify(events));

    setBackToDashboard(true);
  };

  const drawEventToEdit = () => {
    if (
      indexEventToEdit === undefined ||
      isNaN(indexEventToEdit) ||
      indexEventToEdit === ""
    ) {
      return;
    } else {
      return (
        <div className="container-event">
          <div className="information-event">
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
          </div>
        </div>
      );
    }
  };

  const removeEventFromLocalStorage = () => {
    events.splice(indexEventToEdit, 1);
    localStorage.setItem("Events", JSON.stringify(events));
    setBackToDashboard(true);
  };

  if (backToDashboard) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <div className="event-container">
        <div className="user-name-container-d">
          <AvatarUser className="avatar-and-name" />
        </div>
        <div className="title-container">
          <div className="title">DETAIL EVENT</div>
          <div className="delete-event" onClick={removeEventFromLocalStorage}>
            <DeleteIcon />
            <span>DELETE EVENT</span>
          </div>
        </div>
        <div className="box-event">
          {itemToDraw}
          <div className="attendees-container">Attendees</div>
        </div>
        ;
        <div className="check-icon-container">
          <DoneIcon className="check-icon" onClick={saveInformationEventEdit} />
        </div>
      </div>
    );
  }
};

export default EditEvent;
