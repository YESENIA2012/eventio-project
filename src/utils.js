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

const getAvatarAndName = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const informationUser = getFromLocalStorage();
      const firsLetterName = informationUser.name[0];
      const firstLetterLastName = informationUser.lastName[0];
      const letterAvatar = `${firsLetterName} ${firstLetterLastName}`;
      const userName = `${informationUser.name} ${informationUser.lastName}`;
      resolve({ letterAvatar, userName });
    }, 500);
  });
};

const getEventData = (eventId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const events = JSON.parse(localStorage.getItem("Events"));
      const event = events.find((event) => event.id === eventId);

      if (!event) {
        console.log("No event found");
        reject(null);
      } else {
        resolve({ event });
      }
    }, 500);
  });
};

const saveStateEvent = (e, text, eventsList, setEventList) => {
  const informationUser = getFromLocalStorage();
  const idUser = informationUser.idUser;
  const nameClassAtTheElement = e.target.className;
  const arrayClass = nameClassAtTheElement.split(" ");
  const eventIdClassName = arrayClass[12];

  if (eventIdClassName === undefined || eventIdClassName === null) {
    return;
  } else {
    const eventToChangeState = eventsList.find(
      (event) => event.id === eventIdClassName
    );

    eventToChangeState.stateEvent = text;

    if (text === "JOIN") {
      const indexUserIdToDelete = eventToChangeState.users.findIndex(
        (user) => user === idUser
      );

      eventToChangeState.users
        .splice(indexUserIdToDelete, 1)
        .filter((user) => user !== undefined);
    } else if (text === "LEAVE") {
      eventToChangeState.users.push(idUser);
    }
  }

  localStorage.setItem("Events", JSON.stringify(eventsList));
  setEventList(JSON.parse(localStorage.getItem("Events")));
};

const goToEditEventFunction = (
  e,
  eventsList,
  setGoToEditEvent,
  setEventToEdit
) => {
  const nameClassAtTheElement = e.target.className;
  const arrayClass = nameClassAtTheElement.split(" ");
  const eventToEdit = arrayClass[12];

  const event = eventsList.find((event) => event.id.toString() === eventToEdit);

  const eventId = event.id;

  if (!eventId) {
    return;
  } else {
    setGoToEditEvent(true);
    setEventToEdit(eventId);
  }
  return eventId;
};

const handleButtonEvent = (
  e,
  event,
  setGoToEditEvent,
  setEventToEdit,
  eventsList,
  setEventList
) => {
  const textButtonState = event.stateEvent;

  if (textButtonState.toLowerCase() === "edit") {
    goToEditEventFunction(e, eventsList, setGoToEditEvent, setEventToEdit);
  } else if (textButtonState.toLowerCase() === "join") {
    saveStateEvent(e, "LEAVE", eventsList, setEventList);
  } else {
    saveStateEvent(e, "JOIN", eventsList, setEventList);
  }
};

const showDetailEventClicked = (
  e,
  eventsList,
  setGoToDetailEvent,
  setEventId
) => {
  const elementClassName = e.target.className;
  const classNamePosition = elementClassName.split(" ");

  if (classNamePosition.includes("button-event")) {
    return;
  }

  const eventClassArray = classNamePosition[0].split("-");
  const elementClickedId = eventClassArray
    .filter((elementClass) => {
      return elementClass !== "element";
    })
    .join("-");

  const eventId = eventsList.find(
    (event) => event.id.toString() === elementClickedId
  );

  if (eventId) {
    setGoToDetailEvent(true);
    setEventId(eventId.id);
  } else {
    return;
  }
};

const getFromLocalStorage = () => {
  const dataUser = JSON.parse(localStorage.getItem("userInformation"));
  return dataUser;
};

const getEventsUser = (events, eventsPerPage, pagesVisited) => {
  const userInformation = getFromLocalStorage();
  let currentEvents = null;
  let pageCount = null;
  if (!userInformation) {
    currentEvents = 0;
    pageCount = 0;
    return { eventsUser: currentEvents, pageCountProfile: pageCount };
  }

  const userId = userInformation.idUser;

  currentEvents =
    events && events.length && userInformation
      ? events
          .map((event) => {
            if (event.users.includes(userId)) {
              return event;
            } else {
              return null;
            }
          })
          .filter((event) => event !== null)
          .slice(pagesVisited, pagesVisited + eventsPerPage)
      : 0;

  pageCount =
    events && events.length
      ? Math.ceil(currentEvents.length / eventsPerPage)
      : 0;

  return { eventsUser: currentEvents, pageCountProfile: pageCount };
};

const getEventsFromLocalStorage = (pageNumber = null) => {
  const events = JSON.parse(localStorage.getItem("Events"));

  if (pageNumber === null) {
    return { events: events };
  }

  const eventsPerPage = 6;
  const pagesVisited = pageNumber * eventsPerPage;
  const eventsUser = getEventsUser(events, eventsPerPage, pagesVisited);

  return {
    events: events,
    currentEvents: eventsUser.eventsUser,
    pageCountProfile: eventsUser.pageCountProfile,
  };
};

const signOutFunction = (setSignOut) => {
  const userInformation = getFromLocalStorage();

  userInformation.isLoggedIn = false;
  setSignOut(true);
  localStorage.setItem("userInformation", JSON.stringify(userInformation));
};

const signOffFunction = () => {
  const informationUser = getFromLocalStorage();
  informationUser.isLoggedIn = false;
  localStorage.setItem("userInformation", JSON.stringify(informationUser));
};

const updateEvent = (event) => {
  const eventsInLocalStorage = getEventsFromLocalStorage();
  let events = eventsInLocalStorage.events;

  const eventUpdate = events.findIndex((element) => element.id === event.id);
  events[eventUpdate] = event;
  localStorage.setItem("Events", JSON.stringify(events));
};

const mockedEvents = [
  {
    id: "yes1",
    date: "April 4, 2017",
    time: "2:17 PM",
    nameEvent: "How to get angry",
    host: "Tom Watts",
    descriptionEvent: "I will show you how to get angry in a second",
    attendees: 9,
    capacity: 31,
    stateEvent: "EDIT",
    users: ["a0e73e98-8e49-4285-8f8a-404e33e53dca"],
  },
  {
    id: "yes2",
    date: "April 4, 2017",
    time: "2:17 PM",
    nameEvent: "Mexican party vol.2",
    host: "Matilda Daniels",
    descriptionEvent: "Party in Scrollbar",
    attendees: 5,
    capacity: 50,
    stateEvent: "JOIN",
    users: ["f3b782de-3a57-4878-991f-92d314fddba6"],
  },
  {
    id: "yes3",
    date: "April 4, 2017",
    time: "2:17 PM",
    nameEvent: "How to become Dark Soldier",
    host: "Bill Soto",
    descriptionEvent:
      "I will tell you insights about how I became Dark Soldier",
    attendees: 5,
    capacity: 50,
    stateEvent: "JOIN",
    users: ["f3b782de-3a57-4878-991f-92d314fddba6"],
  },
  {
    id: "yes1jdj",
    date: "April 4, 2017",
    time: "2:17 PM",
    nameEvent: "Parkour lesson",
    host: "Johnny Erickson",
    descriptionEvent: "Meet me at 5th Eve!",
    attendees: 3,
    capacity: 1000,
    stateEvent: "JOIN",
    users: [],
  },
  {
    id: "yes1dj",
    date: "April 4, 2017",
    time: "2:17 PM",
    nameEvent: "Party in Asgard",
    host: "Ivan Wong",
    descriptionEvent: "You can bring your +1!",
    attendees: 657,
    capacity: 1000,
    stateEvent: "JOIN",
    users: [],
  },
  {
    id: "cyes1mk",
    date: "April 4, 2017",
    time: "2:17 PM",
    nameEvent: "Russian lesson",
    host: "Herman Ray",
    descriptionEvent: "Speak russian fluently.",
    attendees: 12,
    capacity: 80,
    stateEvent: "JOIN",
    users: [],
  },
];

const createFakeEvents = () => {
  localStorage.setItem("Events", JSON.stringify([...mockedEvents]));
};

export {
  signOffFunction,
  createFakeEvents,
  styles,
  getFromLocalStorage,
  getAvatarAndName,
  handleButtonEvent,
  showDetailEventClicked,
  signOutFunction,
  getEventsFromLocalStorage,
  updateEvent,
  styleTextFieldEditEvent,
  getEventData,
};
