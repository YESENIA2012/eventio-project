import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

import EditEventCard from "./EditEventCard";
import AvatarUser from "../avatarUser/AvatarUser";
import {
  getEventsFromLocalStorage,
  updateEvent,
  getEventData,
} from "../../utils";
import "./styleEditEvents.scss";

const EditEvent = () => {
  const eventId = useParams().id;
  const [event, setEvent] = useState(null);
  const [itemToDraw, setItemToDraw] = useState(null);
  const [backToDashboard, setBackToDashboard] = useState(false);

  useEffect(() => {
    async function getEvent(eventId) {
      try {
        const eventData = await getEventData(eventId);
        const eventEdit = eventData.event;
        setEvent(eventEdit);
      } catch (error) {
        console.log(error);
      }
    }

    getEvent(eventId);
  }, []);

  useEffect(() => {
    if (!event) {
      return;
    }
    setItemToDraw(
      <EditEventCard
        event={event}
        backToDashboard={backToDashboard}
        onChangeDataEvent={onChangeDataEvent}
      />
    );
  }, [event]);

  const onChangeDataEvent = (eventEdit) => {
    setEvent(eventEdit);
  };

  const saveInformationEventEdit = () => {
    updateEvent(event);
    setBackToDashboard(true);
  };

  const removeEventFromLocalStorage = () => {
    const eventsInLocalStorage = getEventsFromLocalStorage();
    let events = eventsInLocalStorage.events;
    events = events.filter((event) => event.id !== eventId);
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

/* const EditEvent = () => {
  const eventId = useParams().id;
  const eventsInLocalStorage = getEventsFromLocalStorage();
  let events = eventsInLocalStorage.events;
  const [event, setEvent] = useState("");
  const [dateEvent, setDateEvent] = useState("");
  const [timeEvent, setTimeEvent] = useState("");
  const [titleEvent, setTitleEvent] = useState("");
  const [descriptionEvent, setDescriptionEvent] = useState("");
  const [capacityPeopleEvent, setCapacityPeopleEvent] = useState("");
  const [itemToDraw, setItemToDraw] = useState(null);
  const [backToDashboard, setBackToDashboard] = useState(false);
  const dateFormats = {
    time: "h:mm A",
    customDate: "ddd MMM DD YYYY",
  };
  dayjs.locale("en");

  useEffect(() => {
    async function getEvent(eventId) {
      try {
        const eventData = await getEventData(eventId);
        const eventEdit = eventData.event;
        setEvent(eventEdit);
        setDateEvent(dayjs(eventEdit.date));
        setTimeEvent(eventEdit.time);
        setTitleEvent(eventEdit.nameEvent);
        setDescriptionEvent(eventEdit.descriptionEvent);
        setCapacityPeopleEvent(eventEdit.capacity);
      } catch (error) {
        console.log(error);
      }
    }

    getEvent(eventId);
  }, []);

  useEffect(() => {
    setItemToDraw(
      <DrawEventToEdit
        dateFormats={dateFormats}
        dateEvent={dateEvent}
        setDateEvent={setDateEvent}
        timeEvent={timeEvent}
        setTimeEvent={setTimeEvent}
        titleEvent={titleEvent}
        setTitleEvent={setTitleEvent}
        descriptionEvent={descriptionEvent}
        setDescriptionEvent={setDescriptionEvent}
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
    //eL ERROR ESTA ACA acomodar el color de la letra cuando creo un evento
    event.date = dateToSave;
    event.time = timeEvent;
    event.nameEvent = titleEvent;
    event.host = host;
    event.descriptionEvent = descriptionEvent;
    event.capacity = capacityPeopleEvent;

    console.log("evento editado", event);
    updateEvent(events);
    setBackToDashboard(true);
  };

  const removeEventFromLocalStorage = () => {
    events = events.filter((event) => event.id !== eventId);
    updateEvent(events);
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

export default EditEvent; */
