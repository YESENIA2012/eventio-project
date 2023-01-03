import { useState } from "react";
import { Navigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { Button } from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import AvatarUser from "../avatarUser/AvatarUser";
import { handleButtonEvent } from "../../utils";
import "./dashboardStyles.scss";

const Dashboard = () => {
  const [viewEvents, setViewEvents] = useState(true);
  const [eventClicked, setEventClicked] = useState("");
  const [goToDetailEvent, setGoToDetailEvent] = useState(false);
  const [goToCreateNewEvent, setGoToCreateNewEvent] = useState(false);
  const [goToFutureEvents, setGoToFutureEvents] = useState(false);
  const [goToPastEvents, setGoToPastEvents] = useState(false);
  const [goToEditEvent, setGoToEditEvent] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [eventToEdit, setEventToEdit] = useState("");
  const [eventsList, setEventList] = useState(
    JSON.parse(localStorage.getItem("Events"))
  );

  const eventsPerPage = 6;
  const pageCount = Math.ceil(eventsList.length / eventsPerPage);
  const pagesVisited = pageNumber * eventsPerPage;
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const showDetailEventClicked = (e) => {
    let elementClassName = e.target.className;
    let classNamePosition = elementClassName.split(" ");
    let eventId = classNamePosition[0].split("-");
    let elementClickedId = Number(eventId[1]);

    if (
      elementClickedId === undefined ||
      isNaN(elementClickedId) ||
      elementClickedId === "" ||
      elementClickedId === null
    ) {
      return;
    } else {
      setGoToDetailEvent(true);
      setEventClicked(elementClickedId);
    }
  };

  if (eventsList === null) {
    return;
  }

  const displayEvents = eventsList
    .slice(pagesVisited, pagesVisited + eventsPerPage)
    .map((element, index) => {
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
    });

  if (goToCreateNewEvent) {
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
                  console.log("yesenia");
                  setViewEvents(true);
                }}
              />
              <ViewStreamIcon
                className="view-stream"
                onClick={() => {
                  console.log("paola");
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
            {displayEvents}
          </div>
          ;
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
