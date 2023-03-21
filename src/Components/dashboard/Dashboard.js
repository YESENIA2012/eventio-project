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
  getEventsFromLocalStorage,
  getFromLocalStorage,
} from "../../utils";
import "./dashboardStyles.scss";

const Dashboard = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [viewEvents, setViewEvents] = useState(true);
  const [eventClicked, setEventClicked] = useState("");
  const [goToDetailEvent, setGoToDetailEvent] = useState(false);
  const [goToCreateNewEvent, setGoToCreateNewEvent] = useState(false);
  const [goToFutureEvents, setGoToFutureEvents] = useState(false);
  const [goToPastEvents, setGoToPastEvents] = useState(false);
  const [goToEditEvent, setGoToEditEvent] = useState(false);
  const [eventToEdit, setEventToEdit] = useState("");
  const eventsFromLocalStorage = getEventsFromLocalStorage(pageNumber);
  const [eventsList, setEventList] = useState(
    eventsFromLocalStorage.eventsList
  );
  const pageCount = eventsFromLocalStorage.pageCount;
  const everyEvents = eventsFromLocalStorage.everyEvents;

  useEffect(() => {
    const informationUser = getFromLocalStorage();
    console.log(informationUser.isLoggedIn);
    if (informationUser && !informationUser.isLoggedIn) {
      setIsLoggedOut(true);
    }
  }, [isLoggedOut]);

  if (isLoggedOut) {
    return <Navigate to="/" />;
  } else if (goToCreateNewEvent) {
    return <Navigate to="/createEvent" />;
  } else if (goToEditEvent) {
    return <Navigate to="/editEvent" state={{ eventToEdit }} />;
  } else if (goToDetailEvent) {
    return <Navigate to="/detailEvent" state={{ eventClicked }} />;
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
            {everyEvents ? (
              everyEvents.map((event, index) => {
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
                      eventDetail={event}
                    />
                  </div>
                );
              })
            ) : (
              <div>No events</div>
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
            nextLinkClassName={"next-bttn"}
            disabledClassName={"pagination-disable"}
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
