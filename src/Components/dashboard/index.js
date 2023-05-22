import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { UserContext } from "../globalState";
import AvatarUser from "../avatarUser/AvatarUser";
import EventCard from "../events/EventCard";
import { getEventsFromServer, isLoggedOut } from "../../utils";
import "./styleDashboard.scss";

const Dashboard = () => {
  const EVENTS_PER_PAGE = 6;
  const { user } = useContext(UserContext);
  const userId = user ? user.idUser : null;
  const [pageNumber, setPageNumber] = useState(0);
  const [viewEvents, setViewEvents] = useState(true);
  const [eventId, setEventId] = useState("");
  const [goToDetailEvent, setGoToDetailEvent] = useState(false);
  const [goToCreateNewEvent, setGoToCreateNewEvent] = useState(false);
  const [goToEditEvent, setGoToEditEvent] = useState(false);
  const [eventToEdit, setEventToEdit] = useState("");
  const [eventsList, setEventList] = useState([]);
  const [refreshEvents,setRefreshEvents] = useState(false)

  const pageCount =
    eventsList && eventsList.length
      ? Math.ceil(eventsList.length / EVENTS_PER_PAGE)
      : 0;

  const pagesVisited = pageNumber * EVENTS_PER_PAGE;

  const eventToDraw =
    eventsList && eventsList.length
      ? eventsList.slice(pagesVisited, pagesVisited + EVENTS_PER_PAGE)
      : 0;

  async function getEvents() {
    try {
      const currentEvents = await getEventsFromServer();
      setEventList(currentEvents.events);
      setRefreshEvents(false)
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  // when we need to refresh
  useEffect(()=>{
    if(refreshEvents){
      console.log("refreshing events...")
      getEvents()
    }
  },[refreshEvents])

  if (isLoggedOut(user)) {
    return <Navigate to="/" />;
  } else if (goToCreateNewEvent) {
    return <Navigate to="/createEvent" />;
  } else if (goToEditEvent) {
    return <Navigate to={`/editEvent/${eventToEdit}`} />;
  } else if (goToDetailEvent) {
    return (
      <Navigate to={`/detailEvent/${eventId}`} state={{ userId: userId }} />
    );
  } else {
    return (
      <div className="event-container">
        <div className="user-name-container-d">
          <AvatarUser user={user} className="avatar-and-name" />
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
                  // @TODO implement this when backend is ready!
                }}
              >
                Future Events
              </span>
              <span
                className="link-3"
                onClick={() => {
                  // @TODO: implement this when backend is ready!
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
              eventToDraw.map((event,index) => {
                return (
                  <EventCard
                    key={String(index)}
                    setGoToDetailEvent={setGoToDetailEvent}
                    setEventId={setEventId}
                    userId={userId}
                    viewEvents={viewEvents}
                    setGoToEditEvent={setGoToEditEvent}
                    setEventToEdit={setEventToEdit}
                    eventDetail={event}
                    setRefreshEvents={setRefreshEvents}
                  />
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
