import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Navigate } from "react-router-dom";

import { Avatar } from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewStreamIcon from "@mui/icons-material/ViewStream";

import {
  paintAvatarAndName,
  getFromLocalStorage,
  signOutFunction,
  showDetailEventClicked,
} from "../../utils";
import "./profileStyle.scss";
import EventCard from "../evenst/EventCard";

const Profile = () => {
  const [textAvatar, setTextAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [viewEvents, setViewEvents] = useState(true);
  const [nameUser, setNameUser] = useState("");
  const [lastNameUser, setLastNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [seeModal, setSeeModal] = useState(false);
  const [signOut, setSignOut] = useState(false);
  const [eventClicked, setEventClicked] = useState("");
  const [goToDashboard, setGoToDashboard] = useState(false);
  const [goToDetailEvent, setGoToDetailEvent] = useState(false);
  const [goToEditEvent, setGoToEditEvent] = useState(false);
  const [eventToEdit, setEventToEdit] = useState("");
  const [eventsList, setEventList] = useState(
    JSON.parse(localStorage.getItem("Events"))
  );

  const [pageNumber, setPageNumber] = useState(0);
  const eventsPerPage = 3;
  const pageCount = Math.ceil(eventsList.length / eventsPerPage);
  const pagesVisited = pageNumber * eventsPerPage;
  const currentEvents = eventsList.slice(
    pagesVisited,
    pagesVisited + eventsPerPage
  );

  useEffect(() => {
    paintAvatarAndName(setTextAvatar, setUserName);
    drawUserInformation();
  }, []);

  useEffect(() => {
    const informationUser = getFromLocalStorage();
    if (informationUser && !informationUser.isLoggedIn) {
      setSignOut(true);
    }
  }, [eventsList]);

  const drawUserInformation = () => {
    const userInformation = getFromLocalStorage();

    let name = userInformation.name;
    let lastName = userInformation.lastName;
    let email = userInformation.email;

    setNameUser(name);
    setLastNameUser(lastName);
    setEmailUser(email);
  };

  if (eventsList === null) {
    return;
  }

  if (signOut) {
    return <Navigate to="/" />;
  } else if (goToDashboard) {
    return <Navigate to="/dashboard" />;
  } else if (goToDetailEvent) {
    return <Navigate to="/detailEvent" state={{ eventClicked }} />;
  } else if (goToEditEvent) {
    return <Navigate to="/editEvent" state={{ eventToEdit }} />;
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
              className="viewModule-icon"
              onClick={() => {
                setViewEvents(true);
              }}
            />
            <ViewStreamIcon
              className="viewStream-icon"
              onClick={() => {
                setViewEvents(false);
              }}
            />
          </span>
        </div>
        {}
        <div
          className={
            viewEvents ? "dashboard-view-row" : "dashboard-view-column"
          }
        >
          {currentEvents.map((event, index) => {
            if (event.stateEvent === "EDIT" || event.stateEvent === "LEAVE") {
              return (
                <div
                  key={event.id}
                  className={
                    viewEvents
                      ? `element-${index} element`
                      : `element-${index} element-column`
                  }
                  onClick={(e) => {
                    showDetailEventClicked(
                      e,
                      setGoToDetailEvent,
                      setEventClicked
                    );
                  }}
                >
                  <EventCard
                    eventsList={eventsList}
                    setEventList={setEventList}
                    setGoToEditEvent={setGoToEditEvent}
                    eventToEdit={eventToEdit}
                    setEventToEdit={setEventToEdit}
                    viewEvents={viewEvents}
                    date={event.date}
                    time={event.time}
                    nameEvent={event.nameEvent}
                    host={event.host}
                    descriptionEvent={event.descriptionEvent}
                    attendees={event.attendees}
                    capacity={event.capacity}
                    id={event.id}
                    stateEvent={event.stateEvent}
                  />
                </div>
              );
            }
          })}
        </div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={({ selected }) => {
            setPageNumber(selected);
          }}
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
            <span className="profile-button">View Profile</span>
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
                signOutFunction(setSignOut);
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
