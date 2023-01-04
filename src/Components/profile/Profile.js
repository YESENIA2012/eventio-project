import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Navigate } from "react-router-dom";

import { Avatar, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewStreamIcon from "@mui/icons-material/ViewStream";

import {
  paintAvatarAndName,
  showDetailEventClicked,
  handleButtonEvent,
} from "../../utils";
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
  const [eventClicked, setEventClicked] = useState("");
  const [goToDetailEvent, setGoToDetailEvent] = useState(false);
  const [goToEditEvent, setGoToEditEvent] = useState(false);
  const [eventToEdit, setEventToEdit] = useState("");
  const [eventsList, setEventList] = useState(
    JSON.parse(localStorage.getItem("Events"))
  );

  const [pageNumber, setPageNumber] = useState(0);
  const eventsPerPage = 6;
  const pageCount = Math.ceil(eventsList.length / eventsPerPage);
  const pagesVisited = pageNumber * eventsPerPage;
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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

  if (eventsList === null) {
    return;
  }

  const displayEvents = eventsList
    .slice(pagesVisited, pagesVisited + eventsPerPage)
    .map((element, index) => {
      if (element.stateEvent === "EDIT" || element.stateEvent === "LEAVE") {
        return (
          <div
            key={index}
            className={
              viewEvents
                ? `element-${index} element`
                : `element-${index} element-column`
            }
            onClick={(e) =>
              showDetailEventClicked(e, setGoToDetailEvent, setEventClicked)
            }
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
                  handleButtonEvent(
                    e,
                    setGoToEditEvent,
                    setEventToEdit,
                    eventToEdit,
                    eventsList,
                    setEventList
                  );
                }}
              >
                {element.stateEvent}
              </Button>
            </div>
          </div>
        );
      }
    });

  if (signOut) {
    return <Navigate to="/" />;
  } else if (goToProfile) {
    return <Navigate to="/profile" />;
  } else if (goToDashboard) {
    return <Navigate to="/dashboard" />;
  } else if (goToDetailEvent) {
    return <Navigate to="/detailEvent" state={{ eventClicked }} />;
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
        >
          {displayEvents}
        </div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination-bttns"}
          previousLinkClassName={"previous-bttn"}
          nextLinkClassName={"next-bttn"}
          disabledClassName={"pagination-disable"}
          activeClassName={"pagination-active"}
        />
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
      </div>
    );
  }
};

export default Profile;
