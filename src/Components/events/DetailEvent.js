import { useContext, useEffect, useState } from "react";
import { Navigate, useParams, useLocation } from "react-router-dom";
import {
  handleButtonEvent,
  getTextButton,
  getEventFromServer,
  getButtonClassName,
} from "../../utils";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import AvatarUser from "../avatarUser/AvatarUser";

import "./detailEventStyle.scss";
import { UserContext } from "../globalState";

const DetailEvent = () => {
  const { user } = useContext(UserContext);
  const eventId = useParams().id;
  const location = useLocation();
  const userId = location.state.userId;
  const [goToCreateNewEvent, setGoToCreateNewEvent] = useState(false);
  const [goToDashboard, setGoToDashboard] = useState(false);
  const [goToEditEvent, setGoToEditEvent] = useState(false);
  const [eventToEdit, setEventToEdit] = useState("");
  const [eventDetail, setEventDetail] = useState(null);
  const textButton = eventDetail ? getTextButton(userId, eventDetail) : "";
  const [refreshEvents, setRefreshEvents] = useState(false);

  async function getEvent() {
    try {
      const eventFound = await getEventFromServer(eventId);
      setEventDetail(eventFound);
      setRefreshEvents(false);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    getEvent();
  }, []);

  useEffect(() => {
    if (refreshEvents) {
      getEvent();
    }
  }, [refreshEvents]);

  const drawEvent = () => {
    if (!eventId || !eventDetail) {
      return;
    }

    return (
      <div className="container-event">
        <div className="information-event">
          <div className="time-date-container">
            <span className="date-d">{eventDetail.date}</span>
            <span className="dash-d">-</span>
            <span className="time-d">{eventDetail.time}</span>
          </div>
          <h1 className="title">{eventDetail.nameEvent}</h1>
          <p className="host-e">{eventDetail.host}</p>
          <p className="description-event-e">{eventDetail.descriptionEvent}</p>
          <div className="attendees-capacity-button-container">
            <div className="attendees-capacity-container">
              <PersonIcon className="person-icon" />
              <span className="attendees">{eventDetail.attendees.length}</span>
              <span className="of-text-d">of</span>
              <span>{eventDetail.capacity}</span>
            </div>
            <Button
              variant="contained"
              className={`${getButtonClassName(textButton)} ${eventDetail.id}`}
              onClick={async (e) => {
                await handleButtonEvent({
                  textButton,
                  userId,
                  eventDetail,
                  setGoToEditEvent,
                  setEventToEdit,
                  setRefreshEvents,
                });
              }}
            >
              {textButton}
            </Button>
          </div>
        </div>
        <div className="name-attendees">Attendees</div>
      </div>
    );
  };

  if (goToCreateNewEvent) {
    return <Navigate to="/createEvent" />;
  } else if (goToDashboard) {
    return <Navigate to="/dashboard" />;
  } else if (goToEditEvent) {
    return <Navigate to={`/editEvent/${eventToEdit}`} />;
  } else {
    return (
      <div className="container-event-section">
        <header className="header-component">
          <div
            className="back-button"
            onClick={() => {
              setGoToDashboard(true);
            }}
          >
            <ArrowBackIcon />
            <span>Back to events</span>
          </div>
          <AvatarUser user={user} className="avatar-name" />
        </header>
        <p className="p-title">DETAIL EVENT</p>
        <section className="section-event-information">{drawEvent()}</section>
        <div className="add-new-event-container">
          <AddCircleIcon
            className="add-new-event-button"
            onClick={() => {
              setGoToCreateNewEvent(true);
            }}
          />
        </div>
      </div>
    );
  }
};

export default DetailEvent;
