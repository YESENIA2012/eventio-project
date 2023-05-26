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
  let { events: eventsCopy } = await getEventsFromServer();
  return new Promise((resolve, reject) => {
    const currentIndex = eventsCopy.findIndex(
      (event) => event.id === eventDetail.id
    );
    eventsCopy[currentIndex].attendees.push(userId);
    // now we add the new attendees
    // update the events in local
    localStorage.setItem("Events", JSON.stringify(eventsCopy));
    resolve();
  });
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
    /* goToEditEventFunction(e, eventDetail, setGoToEditEvent, setEventToEdit); */
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

const getUserDataFromServer = () => {
  return new Promise((resolve) => {
    const dataUser = JSON.parse(localStorage.getItem("userInformation"));
    resolve(dataUser);
  });
};

const getFromLocalStorage = () => {
  const dataUser = JSON.parse(localStorage.getItem("userInformation"));
  return dataUser;
};

const getEventsUser = (events, pageNumber, userId) => {
  const eventsPerPage = 6;
  const pagesVisited = pageNumber * eventsPerPage;

  let currentEvents = null;
  let pageCount = null;

  if (!userId) {
    currentEvents = [];
    pageCount = 0;
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

const getEventsFromServer = (pageNumber = null, userId = null) => {
  return new Promise((resolve) => {
    const events = JSON.parse(localStorage.getItem("Events"));

    if (!events) {
      resolve({ events: [] });
    }

    if (pageNumber === null && userId == null) {
      resolve({ events: events.map((event) => event) });
    }

    const eventUser = getEventsUser(events, pageNumber, userId);

    resolve({
      events: events.map((event) => event), // generate a new array
      currentEvents: eventUser.eventsUser,
      pageCountProfile: eventUser.pageCountProfile,
    });
  });
};

const getEventFromServer = async (eventId) => {
  const eventsFronServer = await getEventsFromServer();
  const events = eventsFronServer.events;

  return new Promise((resolve) => {
    const event = events.find((event) => event.id.toString() === eventId);
    resolve(event);
  });
};

const updateEventAttendees = async (updatedEvent, userId) => {
  let currentEvents = await getEventsFromServer();

  return new Promise((resolve) => {
    let events = currentEvents.events;
    let eventsCopy = events.map((event) => event);
    const arrayIndex = eventsCopy.findIndex(
      (element) => element.id === updatedEvent.id
    );
    const currentAttendees = eventsCopy[arrayIndex].attendees;
    const newAttendees = currentAttendees.filter(
      (attendeeId) => attendeeId !== userId
    );
    eventsCopy[arrayIndex].attendees = newAttendees;
    localStorage.setItem("Events", JSON.stringify(eventsCopy));
    resolve();
  });
};

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

const saveEvent = async (newEvent) => {
  let currentEvents = await getEventsFromServer();
  return new Promise((resolve) => {
    if (!currentEvents.events.length) {
      localStorage.setItem("Events", JSON.stringify([newEvent]));
    } else {
      const newEvents = [...currentEvents.events, newEvent];
      localStorage.setItem("Events", JSON.stringify(newEvents));
    }
    resolve({ status: 200, data: [newEvent] });
  });
};

const mockedEvents = [
  {
    id: "yes2",
    eventOwner: "carol3",
    date: "April 4, 2017",
    time: "2:17 PM",
    nameEvent: "Mexican party vol.2",
    host: "Matilda Daniels",
    descriptionEvent: "Party in Scrollbar",
    attendees: ["3e97eaf8-92bd-4911-b169-c4934fb31023"],
    capacity: 50,
  },
  {
    id: "yes3",
    eventOwner: "carol2",
    date: "April 4, 2017",
    time: "2:17 PM",
    nameEvent: "How to become Dark Soldier",
    host: "Bill Soto",
    descriptionEvent:
      "I will tell you insights about how I became Dark Soldier",
    attendees: [],
    capacity: 50,
  },
  {
    id: "yes1jdj",
    eventOwner: "carol1",
    date: "April 4, 2017",
    time: "2:17 PM",
    nameEvent: "Parkour lesson",
    host: "Johnny Erickson",
    descriptionEvent: "Meet me at 5th Eve!",
    attendees: [],
    capacity: 1000,
  },
  {
    id: "yes1dj",
    eventOwner: "carol",
    date: "April 4, 2017",
    time: "2:17 PM",
    nameEvent: "Party in Asgard",
    host: "Ivan Wong",
    descriptionEvent: "You can bring your +1!",
    attendees: [],
    capacity: 1000,
  },
];

const createFakeEvents = () => {
  localStorage.setItem("Events", JSON.stringify([...mockedEvents]));
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
  getFromLocalStorage,
  createFakeEvents,
  getEventsFromServer,
  getEventsFromLocalStorage,
  updateEvent,
  saveEvent,
  getUserDataFromServer,
  getEventFromServer,
  getButtonClassName,
};
