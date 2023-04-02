import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Navigate } from "react-router-dom";

import { Avatar } from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewStreamIcon from "@mui/icons-material/ViewStream";

import {
  getAvatarAndName,
  getFromLocalStorage,
  signOutFunction,
  showDetailEventClicked,
  getEventsFromLocalStorage,
  signOffFunction,
} from "../../utils";
import "./profileStyle.scss";
import EventCard from "../events/EventCard";

const Profile = () => {
  const [pageNumber, setPageNumber] = useState(0);
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
  const eventsFromLocalStorage = getEventsFromLocalStorage(pageNumber);
  const [eventsList, setEventList] = useState(eventsFromLocalStorage.events);
  const pageCount = eventsFromLocalStorage.pageCountProfile;
  let currentEvents = eventsFromLocalStorage.currentEvents;

  useEffect(() => {
    const informationUser = getFromLocalStorage();
    if ((informationUser && !informationUser.isLoggedIn) || !informationUser) {
      setSignOut(true);
    }
  }, [signOut]);

  useEffect(() => {
    async function getAvatar() {
      try {
        const userData = await getAvatarAndName();
        setTextAvatar(userData.letterAvatar);
        setUserName(userData.userName);
      } catch (error) {
        console.log(error);
      }
    }

    getAvatar();
    drawUserInformation();
  }, []);

  const drawUserInformation = () => {
    const userInformation = getFromLocalStorage();

    if (!userInformation) {
      return;
    }

    let name = userInformation.name;
    let lastName = userInformation.lastName;
    let email = userInformation.email;

    setNameUser(name);
    setLastNameUser(lastName);
    setEmailUser(email);
  };

  if (!eventsList) {
    currentEvents = 0;
  }

  if (signOut) {
    return <Navigate to="/" />;
  } else if (goToDashboard) {
    return <Navigate to="/dashboard" />;
  } else if (goToEditEvent) {
    return <Navigate to="/editEvent" state={{ eventToEdit }} />;
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
        <div
          className={
            viewEvents ? "dashboard-view-row" : "dashboard-view-column"
          }
        >
          {currentEvents && currentEvents.length ? (
            currentEvents.map((event, index) => {
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
                    viewEvents={viewEvents}
                    setGoToEditEvent={setGoToEditEvent}
                    eventToEdit={eventToEdit}
                    setEventToEdit={setEventToEdit}
                    eventsList={eventsList}
                    setEventList={setEventList}
                    eventDetail={event}
                  />
                </div>
              );
            })
          ) : (
            <div className="message-not-event">You have no events</div>
          )}
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
                signOffFunction();
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
