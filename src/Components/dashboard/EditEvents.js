import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

import dayjs from "dayjs";

import DrawEventToEdit from "../events/EditEventCard";
import AvatarUser from "../avatarUser/AvatarUser";
import {
  getEventsFromLocalStorage,
  saveEventsInLocalStorage,
} from "../../utils";
import "./styleEditEvents.scss";

const EditEvent = () => {
  const location = useLocation();
  const eventToEdit = location.state.eventToEdit;
  const eventsInLocalStorage = getEventsFromLocalStorage();
  let events = eventsInLocalStorage.events || [];
  const indexEventToEdit = events.findIndex(
    (event) => event.id === eventToEdit
  );
  const event = events[indexEventToEdit] || events[0];
  const [dateEvent, setDateEvent] = useState(dayjs(event.date));
  const [timeEvent, setTimeEvent] = useState(event.time);
  const [titleEvent, setTitleEvent] = useState(event.nameEvent);
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
  dayjs.locale("en");

  useEffect(() => {
    setItemToDraw(
      <DrawEventToEdit
        dateFormats={dateFormats}
        dateEvent={dateEvent}
        setDateEvent={setDateEvent}
        setTimeEvent={setTimeEvent}
        timeEvent={timeEvent}
        setTitleEvent={setTitleEvent}
        descriptionEvent={descriptionEvent}
        setDescriptionEvent={setDescriptionEvent}
        titleEvent={titleEvent}
        capacityPeopleEvent={capacityPeopleEvent}
        setCapacityPeopleEvent={setCapacityPeopleEvent}
      />
    );
  }, [dateEvent, timeEvent, titleEvent, descriptionEvent, capacityPeopleEvent]);

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

    saveEventsInLocalStorage(events);
    setBackToDashboard(true);
  };

  const removeEventFromLocalStorage = () => {
    events = events.filter((event) => event.id !== eventToEdit);
    saveEventsInLocalStorage(events);
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
