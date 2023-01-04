import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

import { TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

import AvatarUser from "../avatarUser/AvatarUser";
import { styles } from "../../utils";
import "./styleEditEvents.scss";

const EditEvent = () => {
  const location = useLocation();
  const eventToEdit = location.state.eventToEdit;
  const events = JSON.parse(localStorage.getItem("Events"));
  const [dateEvent, setDateEvent] = useState(events[eventToEdit].date);
  const [timeEvent, setTimeEvent] = useState(events[eventToEdit].time);
  const [titleEvent, setTitleEvent] = useState(events[eventToEdit].nameEvent);
  const [descriptionEvent, setDescriptionEvent] = useState(
    events[eventToEdit].descriptionEvent
  );
  const [capacityPeopleEvent, setCapacityPeopleEvent] = useState(
    events[eventToEdit].capacity
  );
  const [itemToDraw, setItemToDraw] = useState("");
  const [backToDashboard, setBackToDashboard] = useState(false);

  const { classes } = styles();

  useEffect(() => {
    setItemToDraw(drawEventToEdit);
  }, [itemToDraw]);

  const drawEventToEdit = () => {
    if (eventToEdit === undefined || isNaN(eventToEdit) || eventToEdit === "") {
      return;
    } else {
      return (
        <div className="container-event">
          <div className="information-event">
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

  const saveInformationEventEdit = () => {
    const informationUser = JSON.parse(localStorage.getItem("userInformation"));
    let host = `${informationUser.name} ${informationUser.lastName}`;

    events[eventToEdit].date = dateEvent;
    events[eventToEdit].time = timeEvent;
    events[eventToEdit].nameEvent = titleEvent;
    events[eventToEdit].host = host;
    events[eventToEdit].descriptionEvent = descriptionEvent;
    events[eventToEdit].capacity = capacityPeopleEvent;

    localStorage.setItem("Events", JSON.stringify(events));

    setBackToDashboard(true);
  };

  const removeEventFromLocalStorage = () => {
    events.splice(eventToEdit, 1);
    events.map((element, index) => {
      element.id = index;
    });

    console.log(events);
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
