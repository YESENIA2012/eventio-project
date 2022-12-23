import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button } from "@mui/material";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import DetailEvent from "../eventClicked/DetailEvent";
import "./dashboardStyles.scss";

const DashboardComponent = () => {
  const [textAvatar, setTextAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [viewEvents, setViewEvents] = useState(true);
  const [eventClicked, setEventClicked] = useState("");
  const [hiddenDashboard, setHiddenDashboard] = useState(false);
  const [goToCreateNewEvent, setGoToCreateNewEvent] = useState(false);
  const [goToFutureEvents, setGoToFutureEvents] = useState(false);
  const [goToPastEvents, setGoToPastEvents] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const eventsList = JSON.parse(localStorage.getItem("Events"));
  const eventsPerPage = 6;
  const pageCount = Math.ceil(eventsList.length / eventsPerPage);
  const pagesVisited = pageNumber * eventsPerPage;
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const paintAvatarAndName = () => {
    const informationUser = JSON.parse(localStorage.getItem("userInformation"));

    let firsLetterName = informationUser.name[0];
    let firstLetterLastName = informationUser.lastName[0];
    let letterAvatar = `${firsLetterName} ${firstLetterLastName}`;
    let userName = `${informationUser.name} ${informationUser.lastName}`;

    setTextAvatar(letterAvatar);
    setUserName(userName);
  };

  useEffect(() => {
    paintAvatarAndName();
  }, []);

  const showDetailEventClicked = (e) => {
    let hiddenDashboard = false;
    let elementClassName = e.target.className;
    let classNamePosition = elementClassName.split(" ");
    let eventId = classNamePosition[0].split("-");
    let elementClickedId = Number(eventId[1]);

    if (
      elementClickedId === undefined ||
      isNaN(elementClickedId) ||
      elementClickedId === ""
    ) {
      return;
    } else {
      hiddenDashboard = true;
    }

    setHiddenDashboard(hiddenDashboard);
    setEventClicked(elementClickedId);
  };

  if (eventsList === null) {
    return;
  }

  const displayEvents = eventsList
    .slice(pagesVisited, pagesVisited + eventsPerPage)
    .map((element, index) => {
      const handleButtonEvent = (e) => {
        let textButton = e.target.innerText;

        if (textButton === "EDIT") {
          console.log("Editar el evento");
        } else if (textButton === "JOIN") {
          e.target.innerText = "LEAVE";
        } else {
          e.target.innerText = "JOIN";
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
              className="button-event"
              onClick={handleButtonEvent}
            >
              {element.stateEvent}
            </Button>
          </div>
        </div>
      );
    });

  if (goToCreateNewEvent) {
    return <Navigate to="/createEvent" />;
  } else {
    return (
      <div className="event-container">
        <section className="user-name-container">
          <div
            className={hiddenDashboard ? "back-button" : "back-button-hidden"}
            onClick={() => {
              setHiddenDashboard(false);
            }}
          >
            <ArrowBackIcon />
            <span>Back to events</span>
          </div>
          <Avatar>{textAvatar}</Avatar>
          <span className="user-name-text">{userName}</span>
        </section>
        <div
          className={
            hiddenDashboard
              ? "container-dashboard-hidden"
              : "container-dashboard"
          }
        >
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
            activeClassName={"pagination-ative"}
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
        <DetailEvent
          eventClicked={eventClicked}
          hiddenEventsList={hiddenDashboard}
        />
      </div>
    );
  }
};

export default DashboardComponent;
