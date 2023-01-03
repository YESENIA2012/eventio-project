import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import { paintAvatarAndName } from "../../utils";
import "./profileStyle.scss";

const Profile = () => {
  const [textAvatar, setTextAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [viewEvents, setViewEvents] = useState(true);
  const [nameUser, setNameUser] = useState("");
  const [lastNameUser, setLastNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [seeModal, setSeeModal] = useState(false);
  const [goToProfile, setGoToProfile] = useState(false);
  const [signOut, setSignOut] = useState(false);
  const [goToDashboard, setGoToDashboard] = useState(false);
  const [eventsList, setEventList] = useState(
    JSON.parse(localStorage.getItem("Events"))
  );

  useEffect(() => {
    paintAvatarAndName(setTextAvatar, setUserName);
    drawUserInformation();
  }, []);

  const drawUserInformation = () => {
    const informationUser = JSON.parse(localStorage.getItem("userInformation"));

    let name = informationUser.name;
    let lastName = informationUser.lastName;
    let email = informationUser.email;

    setNameUser(name);
    setLastNameUser(lastName);
    setEmailUser(email);
  };
  /* 
  const displayEvents = eventsList
  .slice(pagesVisited, pagesVisited + eventsPerPage)
  .map((element, index) => {
    const handleButtonEvent = (e) => {
      let textButton = e.target.innerText;

      if (textButton === "EDIT") {
        goToEditEventFunction(e);
      } else if (textButton === "JOIN") {
        saveStateEvent(e, "LEAVE");
      } else {
        saveStateEvent(e, "JOIN");
      }
    };

    return (
      <div
        key={index}
        className={
          viewEvents
            ? `element-${index} element`
            : `element-${index} element-column`
        }
        onClick={(e) => showDetailEventClicked(e)}
      >
        <div className="date-time-container">
          <spam className="date">{element.date}</spam>
          <span className="dash">-</span>
          <spam className="time">{element.time}</spam>
        </div>
        <h4 className="title-event">{element.nameEvent}</h4>
        <p className="p-host">{element.host}</p>
        <p className="description-event">{element.descriptionEvent}</p>
        <div className="button-attendees-capacity-container ">
          <span className="attendees">
            <PersonIcon className={viewEvents ? "" : "icon-hide-person"} />
            <span>{element.attendees}</span>
            <span className="of-text">of</span>
            <span>{element.capacity}</span>
          </span>
          <Button
            variant="contained"
            className={`button-event ${element.id}`}
            onClick={(e) => {
              handleButtonEvent(e);
            }}
          >
            {element.stateEvent}
          </Button>
        </div>
      </div>
    );
  }); */

  if (signOut) {
    return <Navigate to="/" />;
  } else if (goToProfile) {
    return <Navigate to="/profile" />;
  } else if (goToDashboard) {
    return <Navigate to="/dashboard" />;
  } else {
    return (
      <div className="profile-container">
        <section className="user-name-profile-container">
          <div className="avatar-name-profile-container">
            <Avatar>{textAvatar}</Avatar>
            <span className="user-name-text-p">{userName}</span>
            <span
              className="arrow-container-p"
              onClick={() => {
                setSeeModal(!seeModal);
              }}
            >
              <ArrowDropDownIcon />
            </span>
          </div>
        </section>
        <div className="user-information-profile-container">
          <Avatar className="user-avatar">{textAvatar}</Avatar>
          <div className="user-information-p">
            <h4 className="user-name-p">{nameUser}</h4>
            <p className="email-user-p">{emailUser}</p>
            <h4 className="user-name-p">{lastNameUser}</h4>
          </div>
        </div>
        <div
          className={
            seeModal
              ? "modal-profile-container"
              : "hide-modal-profile-container"
          }
        >
          <nav className="modal-container-p">
            <span
              className="profile-button"
              onClick={() => {
                setGoToProfile(true);
              }}
            >
              View Profile
            </span>
            <span
              className="dashboard-button"
              onClick={() => {
                setGoToDashboard(true);
              }}
            >
              Dashboard
            </span>
            <span
              className="sign-out-button-p"
              onClick={() => {
                setSignOut(true);
              }}
            >
              Sign Out
            </span>
          </nav>
        </div>
        <div className="dashboard-view">
          <span>My Events</span>
          <span>
            <ViewModuleIcon
              onClick={() => {
                setViewEvents(true);
              }}
            />
            <ViewStreamIcon
              onClick={() => {
                setViewEvents(false);
              }}
            />
          </span>
        </div>
        <div
          className={
            viewEvents ? "dashboard-view-row" : "dashboard-view-column"
          }
        ></div>
      </div>
    );
  }
};

export default Profile;
