import { Button, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "tss-react/mui";

import { mockedEventsCopy } from "../../utils";
import "./newEventStyle.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

const styles = makeStyles()((theme) => {
  return {
    textFieldStyle: {
      marginBottom: 14,
      width: "80%",
    },
  };
});

const NewEvent = () => {
  const { classes } = styles();

  const createNewEventFunction = (e) => {
    e.preventDefault();

    let nameEvent = document.querySelector("#title-event").value;
    let description = document.querySelector("#description-event").value;
    let date = document.querySelector("#date-event").value;
    let time = document.querySelector("#time-event").value;
    let capacity = document.querySelector("#capacity-event").value;
    let stateEvent = "EDIT";
    let id = mockedEventsCopy.length;

    const informationUser = JSON.parse(localStorage.getItem("userInformation"));
    let host = `${informationUser[0].name} ${informationUser[0].lastName}`;

    mockedEventsCopy.push({
      id: id,
      date: date,
      time: time,
      nameEvent: nameEvent,
      host: host,
      descriptionEvent: description,
      attendees: 1,
      capacity: capacity,
      stateEvent: stateEvent,
    });

    localStorage.setItem("Events", JSON.stringify(mockedEventsCopy));

    document.querySelector("#title-event").value = "";
    document.querySelector("#description-event").value = "";
    document.querySelector("#date-event").value = "";
    document.querySelector("#time-event").value = "";
    document.querySelector("#capacity-event").value = "";
    console.log(mockedEventsCopy);
  };
  return (
    <div className="container-new-event">
      <p className="close-element">
        <Link to="dashboard">
          <CloseIcon />
          <span>Close</span>
        </Link>
      </p>
      <div className="create-new-event">
        <h3>Create new event</h3>
        <TextField
          label="Title"
          type="text"
          id="title-event"
          variant="standard"
          className={classes.textFieldStyle}
          sx={{
            "& .MuiInputLabel-root": {},
            borderBottom: "1px solid rgb(179, 175, 177)",
          }}
          InputProps={{ disableUnderline: true }}
          InputLabelProps={{ className: "text-label" }}
        ></TextField>
        <TextField
          label="Description"
          type="text"
          id="description-event"
          variant="standard"
          className={classes.textFieldStyle}
          sx={{
            "& .MuiInputLabel-root": {},
            borderBottom: "1px solid rgb(179, 175, 177)",
          }}
          InputProps={{ disableUnderline: true }}
          InputLabelProps={{ className: "text-label" }}
        ></TextField>
        <TextField
          label="Date"
          type="text"
          id="date-event"
          variant="standard"
          className={classes.textFieldStyle}
          sx={{
            "& .MuiInputLabel-root": {},
            borderBottom: "1px solid rgb(179, 175, 177)",
          }}
          InputProps={{ disableUnderline: true }}
          InputLabelProps={{ className: "text-label" }}
        ></TextField>
        <TextField
          label="Time"
          type="text"
          id="time-event"
          variant="standard"
          className={classes.textFieldStyle}
          sx={{
            "& .MuiInputLabel-root": {},
            borderBottom: "1px solid rgb(179, 175, 177)",
          }}
          InputProps={{ disableUnderline: true }}
          InputLabelProps={{ className: "text-label" }}
        ></TextField>
        <TextField
          label="Capacity"
          type="text"
          id="capacity-event"
          variant="standard"
          className={classes.textFieldStyle}
          sx={{
            "& .MuiInputLabel-root": {},
            borderBottom: "1px solid rgb(179, 175, 177)",
          }}
          InputProps={{ disableUnderline: true }}
          InputLabelProps={{ className: "text-label" }}
        ></TextField>
        <Button
          variant="contained"
          className="new-event-button"
          onClick={createNewEventFunction}
        >
          CREATE NEW EVENT
        </Button>
      </div>
    </div>
  );
};

export default NewEvent;
