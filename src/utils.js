import { makeStyles } from "tss-react/mui";
import { v4 as uuidv4 } from "uuid";

const styles = makeStyles()(() => {
  return {
    textFieldStyle: {
      marginBottom: 14,
      width: "80%",
    },
  };
});

const getFromLocalStorage = () => {
  const dataUser = JSON.parse(localStorage.getItem("userInformation"));
  return dataUser;
};

const saveUserInformation = () => {
  let userInformation = null;

  userInformation = {
    name: "Yesenia",
    lastName: "Gonzalez",
    email: "g@gmail.com",
    password: "dilan123",
    isLoggedIn: true,
    idUser: uuidv4(),
  };

  localStorage.setItem("userInformation", JSON.stringify(userInformation));
};

/* saveUserInformation(); */

const getEventsFromLocalStorage = (pageNumber) => {
  const userInformation = getFromLocalStorage();
  const userId = userInformation.idUser;
  const events = JSON.parse(localStorage.getItem("Events"));

  const eventsPerPage = 6;

  const pageCount =
    events && events.length ? Math.ceil(events.length / eventsPerPage) : 0;

  const pagesVisited = pageNumber * eventsPerPage;

  const everyEvents =
    events && events.length
      ? events
          .slice(pagesVisited, pagesVisited + eventsPerPage)
          .map((event) => {
            return event;
          })
      : 0;

  let currentEvents =
    events && events.length
      ? events
          .slice(pagesVisited, pagesVisited + eventsPerPage)
          .map((event) => {
            if (event.users.includes(userId)) {
              return event;
            } else {
              return null;
            }
          })
          .filter((event) => event !== null)
      : 0;

  return {
    eventsList: events,
    currentEvents: currentEvents,
    pageCount: pageCount,
    everyEvents: everyEvents,
  };
};

const paintAvatarAndName = (setTextAvatar, setUserName) => {
  const informationUser = JSON.parse(localStorage.getItem("userInformation"));

  let firsLetterName = informationUser.name[0];
  let firstLetterLastName = informationUser.lastName[0];
  let letterAvatar = `${firsLetterName} ${firstLetterLastName}`;
  let userName = `${informationUser.name} ${informationUser.lastName}`;

  setTextAvatar(letterAvatar);
  setUserName(userName);
};

const saveStateEvent = (e, text, eventToEdit, eventsList, setEventList) => {
  let nameClassAtTheElement = e.target.className;
  let arrayClass = nameClassAtTheElement.split(" ");
  let eventToEditState = Number(arrayClass[12]);

  if (eventToEdit === undefined || eventToEdit === null || isNaN(eventToEdit)) {
    return;
  } else {
    eventsList[eventToEditState].stateEvent = text;
  }

  localStorage.setItem("Events", JSON.stringify(eventsList));
  setEventList(JSON.parse(localStorage.getItem("Events")));
};

const goToEditEventFunction = (e, setGoToEditEvent, setEventToEdit) => {
  let nameClassAtTheElement = e.target.className;
  let arrayClass = nameClassAtTheElement.split(" ");
  let eventToEdit = Number(arrayClass[12]);

  if (eventToEdit === undefined || eventToEdit === null || isNaN(eventToEdit)) {
    return;
  } else {
    setGoToEditEvent(true);
  }

  setEventToEdit(eventToEdit);
};

const handleButtonEvent = (
  e,
  setGoToEditEvent,
  setEventToEdit,
  eventToEdit,
  eventsList,
  setEventList
) => {
  let textButton = e.target.innerText;

  if (textButton === "EDIT") {
    goToEditEventFunction(e, setGoToEditEvent, setEventToEdit);
  } else if (textButton === "JOIN") {
    saveStateEvent(e, "LEAVE", eventToEdit, eventsList, setEventList);
  } else {
    saveStateEvent(e, "JOIN", eventToEdit, eventsList, setEventList);
  }
};

const showDetailEventClicked = (e, setGoToDetailEvent, setEventClicked) => {
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

const mockedEvents = [
  {
    id: 0,
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
    id: 1,
    date: "April 4, 2017",
    time: "2:17 PM",
    nameEvent: "Mexican party vol.2",
    host: "Matilda Daniels",
    descriptionEvent: "Party in Scrollbar",
    attendees: 5,
    capacity: 50,
    stateEvent: "JOIN",
    users: [],
  },
  {
    id: 2,
    date: "April 4, 2017",
    time: "2:17 PM",
    nameEvent: "How to become Dark Soldier",
    host: "Bill Soto",
    descriptionEvent:
      "I will tell you insights about how I became Dark Soldier",
    attendees: 5,
    capacity: 50,
    stateEvent: "JOIN",
    users: [],
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
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

createFakeEvents();

const signOffFunction = () => {
  const informationUser = getFromLocalStorage();
  informationUser.isLoggedIn = false;
  localStorage.setItem("userInformation", JSON.stringify(informationUser));
};

export {
  signOffFunction,
  styles,
  getFromLocalStorage,
  getEventsFromLocalStorage,
  paintAvatarAndName,
  handleButtonEvent,
  showDetailEventClicked,
};
