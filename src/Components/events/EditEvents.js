import { useState, useEffect, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditEventCard from "./EditEventCard";
import AvatarUser from "../avatarUser/AvatarUser";
import { UserContext } from "../globalState";
import {
  getEventsFromLocalStorage,
  updateEvent,
  getEventData,
} from "../../utils";
import "./styleEditEvents.scss";

const EditEvent = () => {
  const { user } = useContext(UserContext);
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
    setItemToDraw(<EditEventCard event={event} setEvent={setEvent} />);
  }, [event]);

  const saveInformationEventEdit = async () => {
    await updateEvent(event);
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
          <AvatarUser className="avatar-and-name" user={user}/>
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
