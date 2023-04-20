import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import { styleTextFieldEditEvent } from "../../utils";

const DrawEventToEdit = (props) => {
  const {
    dateFormats,
    dateEvent,
    setDateEvent,
    setTimeEvent,
    timeEvent,
    setTitleEvent,
    descriptionEvent,
    setDescriptionEvent,
    titleEvent,
    setCapacityPeopleEvent,
    capacityPeopleEvent,
  } = props;

  const { classes } = styleTextFieldEditEvent();

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
};

export default DrawEventToEdit;
