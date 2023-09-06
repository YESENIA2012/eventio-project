import { useState, useEffect, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditEventCard from "./EditEventCard";
import AvatarUser from "../avatarUser/AvatarUser";
import { UserContext } from "../globalState";
import {
  request
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
        const endpoint = `events/event/${eventId}`
        const method = "GET"
        const eventEdit = await request(endpoint, method);
        console.log("eventEdit", eventEdit)

        setEvent(eventEdit);
      } catch (error) {
        console.log("Error", error);
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
    try {
      const endpoint = `events/${eventId}`
      const method = "PUT"
      const body = { 
        userId: user.idUser,
        title: event.nameEvent,
        description: event.descriptionEvent,
        event_date: event.date,
        event_time: event.time, 
        capacity: event.capacity, 
      }

      await request(endpoint, method, body);
      setBackToDashboard(true); 
    } catch (error) {
      console.log("Error", error)
    } 
  };

  const removeEventFromLocalStorage = async () => {
    try {
      const endpoint = `events/${eventId}`
      const method = "DELETE"
      const body = { 
        userId: user.idUser,
      }

      await request(endpoint, method, body)
      setBackToDashboard(true);
    } catch (error) {
      console.log("Error", error)
    }
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
          <div className="attendees-container">
            <p>Attendees</p>
            <div>{ event.attendeesNames }</div>
          </div>
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
