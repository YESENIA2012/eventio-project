import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import AvatarUser from "../avatarUser/AvatarUser";
import EventCard from "../events/EventCard";
import {
  showDetailEventClicked,
  getEventsFromServer,
  getFromLocalStorage,
} from "../../utils";
import "./styleDashboard.scss";

const Dashboard = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [viewEvents, setViewEvents] = useState(true);
  const [eventId, setEventId] = useState("");
  const [goToDetailEvent, setGoToDetailEvent] = useState(false);
  const [goToCreateNewEvent, setGoToCreateNewEvent] = useState(false);
  const [goToFutureEvents, setGoToFutureEvents] = useState(false);
  const [goToPastEvents, setGoToPastEvents] = useState(false);
  const [goToEditEvent, setGoToEditEvent] = useState(false);
  const [eventToEdit, setEventToEdit] = useState("");
  const [eventsList, setEventList] = useState([]);
  const [userId, setUserId] = useState(null);
  const eventsPerPage = 6;
  const pageCount =
    eventsList && eventsList.length
      ? Math.ceil(eventsList.length / eventsPerPage)
      : 0;

  const pagesVisited = pageNumber * eventsPerPage;

  const eventToDraw =
    eventsList && eventsList.length
      ? eventsList.slice(pagesVisited, pagesVisited + eventsPerPage)
      : 0;

  useEffect(() => {
    const informationUser = getFromLocalStorage();
    setUserId(informationUser.idUser);
  }, []);

  useEffect(() => {
    async function getEvents() {
      try {
        const currentEvents = await getEventsFromServer();
        setEventList(currentEvents.events);
      } catch (error) {
        console.log("error", error);
      }
    }

    getEvents();
  }, []);

  useEffect(() => {
    const informationUser = getFromLocalStorage();
    if ((informationUser && !informationUser.isLoggedIn) || !informationUser) {
      setIsLoggedOut(true);
    }
  }, [isLoggedOut]);

  if (isLoggedOut) {
    return <Navigate to="/" />;
  } else if (goToCreateNewEvent) {
    return <Navigate to="/createEvent" />;
  } else if (goToEditEvent) {
    return <Navigate to={`/editEvent/${eventToEdit}`} />;
  } else if (goToDetailEvent) {
    return <Navigate to={`/detailEvent/${eventId}`} state={{ userId }} />;
  } else {
    return (
      <div className="event-container">
        <div className="user-name-container-d">
          <AvatarUser className="avatar-and-name" />
        </div>
        <div className="container-dashboard">
          <div className="nav-icon-container">
            <nav className="nav-link-container">
              <span to="dashboard" className="link-1">
                All events
              </span>
              <span
                className="link-2"
                onClick={() => {
                  setGoToFutureEvents(true);
                }}
              >
                Future Events
              </span>
              <span
                className="link-3"
                onClick={() => {
                  setGoToPastEvents(true);
                }}
              >
                Past Events
              </span>
            </nav>
            <div className="view-icon">
              <ViewModuleIcon
                className="view-module"
                onClick={() => {
                  setViewEvents(true);
                }}
              />
              <ViewStreamIcon
                className="view-stream"
                onClick={() => {
                  setViewEvents(false);
                }}
              />
            </div>
          </div>
          <div
            className={
              viewEvents ? "box-event-view-row" : "box-event-view-column"
            }
          >
            {eventToDraw ? (
              eventToDraw.map((event) => {
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
                        eventsList,
                        setGoToDetailEvent,
                        setEventId
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
          ;
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
              eventToDraw.length ? "next-bttn" : "hide-pagination-btn-dashboard"
            }
            disabledClassName={
              eventToDraw.length
                ? "pagination-disable"
                : "hide-pagination-btn-dashboard"
            }
            activeClassName={"pagination-active"}
          />
          <div className="add-new-event-container">
            <AddCircleIcon
              className="add-new-event-button"
              onClick={() => {
                setGoToCreateNewEvent(true);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
