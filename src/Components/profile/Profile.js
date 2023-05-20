import { useState, useEffect, useContext } from "react";
import ReactPaginate from "react-paginate";
import { Navigate } from "react-router-dom";

import { Avatar } from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewStreamIcon from "@mui/icons-material/ViewStream";

import {
  showDetailEventClicked,
  getEventsFromServer,
  isLoggedOut,
} from "../../utils";
import "./profileStyle.scss";
import EventCard from "../events/EventCard";
import { UserContext } from "../globalState";

const Profile = () => {
  const { user, logout } = useContext(UserContext);
  const [pageNumber, setPageNumber] = useState(0);
  const textAvatar = `${user.name[0]} ${user.lastName[0]}`;
  const userName = `${user.name} ${user.lastName}`;
  const [viewEvents, setViewEvents] = useState(true);
  const nameUser = user.name;
  const lastNameUser = user.lastName;
  const emailUser = user.email;
  const [seeModal, setSeeModal] = useState(false);
  const [id, setId] = useState("");
  const [goToDashboard, setGoToDashboard] = useState(false);
  const [goToDetailEvent, setGoToDetailEvent] = useState(false);
  const [goToEditEvent, setGoToEditEvent] = useState(false);
  const [eventToEdit, setEventToEdit] = useState("");
  const userId = user && user.idUser ? user.idUser : null;
  const [pageCount, setPageCount] = useState(0);
  const [eventsListUser, setEventListUser] = useState([]);

  useEffect(() => {
    async function getEventsUser() {
      try {
        const currentEvents = await getEventsFromServer(pageNumber, userId);
        setEventListUser(currentEvents.currentEvents);
        setPageCount(currentEvents.pageCountProfile);
      } catch (error) {
        console.log("error", error);
      }
    }

    getEventsUser();
  }, [pageNumber]);

  if (isLoggedOut(user)) {
    return <Navigate to="/" />;
  } else if (goToDashboard) {
    return <Navigate to="/dashboard" />;
  } else if (goToEditEvent) {
    return <Navigate to={`/editEvent/${eventToEdit}`} />;
  } else if (goToDetailEvent) {
    return <Navigate to={`/detailEvent/${id}`} state={{ userId: userId }} />;
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
          {eventsListUser && eventsListUser.length ? (
            eventsListUser.map((event) => {
              return (
                <div
                  key={event.id}
                  className={
                    viewEvents
                      ? `element-${event.id} element`
                      : `element-${event.id} element-column`
                  }
                  onClick={(e) => {
                    showDetailEventClicked(
                      e,
                      eventsListUser,
                      setGoToDetailEvent,
                      setId
                    );
                  }}
                >
                  <EventCard
                    userId={userId}
                    viewEvents={viewEvents}
                    setGoToEditEvent={setGoToEditEvent}
                    setEventToEdit={setEventToEdit}
                    eventDetail={event}
                  />
                </div>
              );
            })
          ) : (
            <div className="message-not-event">No events found</div>
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
          nextLinkClassName={
            eventsListUser.length ? "next-bttn" : "hide-pagination-btn"
          }
          disabledClassName={
            eventsListUser.length ? "pagination-disable" : "hide-pagination-btn"
          }
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
            <span className="sign-out-button-p" onClick={logout}>
              Sign Out
            </span>
          </nav>
        </div>
      </div>
    );
  }
};

export default Profile;
