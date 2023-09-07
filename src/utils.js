import { makeStyles } from "tss-react/mui";

const styles = makeStyles()(() => {
  return {
    textFieldStyle: {
      marginBottom: 14,
      width: "80%",
    },
  };
});

const styleTextFieldEditEvent = makeStyles()(() => {
  return {
    textFieldStyle: {
      marginBottom: 14,
      width: "92%",
    },
  };
});

const getEventData = (eventId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const events = JSON.parse(localStorage.getItem("Events"));
      const event = events.find((event) => event.id === eventId);

      if (!event) {
        reject(null);
      } else {
        resolve({ event });
      }
    }, 500);
  });
};

const joinEvent = async (eventDetail, userId) => {
  try {
    const endpoint = "events/join"
    const method = "POST"
    const body = {
      eventId : eventDetail.id,
      userId : userId,
    }
    await request(endpoint, method, body);
  } catch (error) {
    console.log("Error", error)
  }
};

const getTextButton = (userId, eventDetail) => {
  let textButton = "";

  if (userId === eventDetail.eventOwner) {
    textButton = "edit";
  } else if (eventDetail.attendees.includes(userId)) {
    textButton = "leave";
  } else {
    textButton = "join";
  }

  return textButton;
};

const handleButtonEvent = async (parameters) => {
  const {
    textButton,
    userId,
    eventDetail,
    setGoToEditEvent,
    setEventToEdit,
    setRefreshEvents,
  } = parameters;

  if (textButton === "edit") {
    setGoToEditEvent(true);
    setEventToEdit(eventDetail.id);
  } else if (textButton === "leave") {
    // first update the record on local storage
    await updateEventAttendees(eventDetail, userId);
    // send request to server to refresh events
    setRefreshEvents(true);
  } else {
    await joinEvent(eventDetail, userId);
    setRefreshEvents(true);
  }
};

const request = async (endpoint, method, body) => {
  const requestOptions ={
    method: method,
    headers: { 'Content-Type': 'application/json' },
  }
  if(body){
    requestOptions.body = JSON.stringify(body)
  }
  
  const result = await fetch(`http://localhost:4000/${endpoint}`, requestOptions )
  const response = await result.json()
  if (!response.error) {
    return response
  }
  const error = new Error(response.error);
  throw error
}

const getEventsUser = (events = [], pageNumber, userId) => {
  const eventsPerPage = 6;
  const pagesVisited = pageNumber * eventsPerPage;
  let currentEvents = [];
  let pageCount = 0;

  if (!userId) {
    return { eventsUser: currentEvents, pageCountProfile: pageCount };
  }
  if(events === null){
    return { eventsUser: currentEvents, pageCountProfile: pageCount };
  }

  currentEvents = events
    .map((event) => {
      if (event.eventOwner === userId && !event.attendees.includes(userId)) {
        return event;
      } else if (
        event.attendees.includes(userId) &&
        event.eventOwner !== userId
      ) {
        return event;
      } else if (
        event.attendees.includes(userId) &&
        event.eventOwner === userId
      ) {
        return event;
      } else {
        return null;
      }
    })
    .filter((event) => event !== null);

  pageCount =
    currentEvents && currentEvents.length
      ? Math.ceil(currentEvents.length / eventsPerPage)
      : 0;

  let eventsUserToDraw =
    currentEvents && currentEvents.length
      ? currentEvents.slice(pagesVisited, pagesVisited + eventsPerPage)
      : 0;

  return { eventsUser: eventsUserToDraw, pageCountProfile: pageCount };
};

//this function is call in edit event component
const getEventsFromLocalStorage = (pageNumber = null, userId = null) => {
  const events = JSON.parse(localStorage.getItem("Events"));

  if (!events) {
    return { events: [] };
  }

  if (pageNumber === null && userId == null) {
    return { events: events };
  }

  const eventsPerPage = 6;
  const pagesVisited = pageNumber * eventsPerPage;
  const eventsUser = getEventsUser(events, eventsPerPage, pagesVisited, userId);

  return {
    events: events,
    currentEvents: eventsUser.eventsUser,
    pageCountProfile: eventsUser.pageCountProfile,
  };
};

//this function is call in index.js dashboard and profile components
const getEventsFromServer = async (pageNumber = null, userId = null) => {

  return new Promise((resolve) => {
    let events = JSON.parse(localStorage.getItem("Events"));

    if (!events || events === null) {
      events = [];
    }

    if (pageNumber === null && userId == null) {
      events = events.map((event) => event);
    }

    const eventUser = getEventsUser(events, pageNumber, userId);

    resolve({
      events: events.map((event) => event), // generate a new array
      currentEvents: eventUser.eventsUser,
      pageCountProfile: eventUser.pageCountProfile,
    });
  });
};

//this function get an event and is call in detail event
const getEventFromServer = async (eventId) => {
  const eventsFronServer = await getEventsFromServer();
  const events = eventsFronServer.events;

  return new Promise((resolve) => {
    const event = events.find((event) => event.id.toString() === eventId);
    resolve(event);
  });
};


const updateEventAttendees = async (updatedEvent, userId) => {
  try {
    const endpoint = "events/leave"
    const method = "DELETE"
    const body = {
      eventId : updatedEvent.id,
      userId : userId,
    }
    await request(endpoint, method, body);
  } catch (error) {
    console.log("Error", error);
  }
};

//this function is call in edit event component
const updateEvent = async (updatedEvent) => {
  let currentEvents = await getEventsFromServer();

  return new Promise((resolve) => {
    let events = currentEvents.events;
    const arrayIndex = events.findIndex(
      (element) => element.id === updatedEvent.id
    );
    events[arrayIndex] = updatedEvent;
    localStorage.setItem("Events", JSON.stringify(events));
    resolve(updatedEvent);
  });
};

const isLoggedOut = (user) => (user && !user.isLoggedIn) || !user;

const getButtonClassName = (textButton) => {
  let buttonClass = "";

  if (textButton === "join") {
    buttonClass = "button-event";
  } else if (textButton === "leave") {
    buttonClass = "pink-class-btn";
  } else {
    buttonClass = "gray-class-btn";
  }

  return buttonClass;
};

export {
  isLoggedOut,
  styles,
  styleTextFieldEditEvent,
  getEventData,
  getTextButton,
  handleButtonEvent,
  getEventsFromServer,
  getEventsFromLocalStorage,
  updateEvent,
  getEventFromServer,
  getButtonClassName,
  request
};
