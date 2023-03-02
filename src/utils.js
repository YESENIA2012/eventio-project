import { makeStyles } from "tss-react/mui";

const styles = makeStyles()(() => {
  return {
    textFieldStyle: {
      marginBottom: 14,
      width: "80%",
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
  stateEvent,
  event,
  setGoToEditEvent,
  setEventToEdit,
  eventToEdit,
  eventsList,
  setEventList
) => {
  let textButtonState = event.stateEvent;

  if (textButtonState.toLowerCase() === "edit") {
    goToEditEventFunction(stateEvent, setGoToEditEvent, setEventToEdit);
  } else if (textButtonState.toLowerCase() === "join") {
    saveStateEvent(stateEvent, "LEAVE", eventToEdit, eventsList, setEventList);
  } else {
    saveStateEvent(stateEvent, "JOIN", eventToEdit, eventsList, setEventList);
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

const getFromLocalStorage = () => {
  const dataUser = JSON.parse(localStorage.getItem("userInformation"));
  return dataUser;
};

const signOutFunction = (setSignOut) => {
  const userInformation = getFromLocalStorage();

  userInformation.isLoggedIn = false;
  setSignOut(true);
  localStorage.setItem("userInformation", JSON.stringify(userInformation));
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
    stateEvent: "LEAVE",
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
  },
];

const mockedEventsCopy = [...mockedEvents];

const saveEvents = () => {
  localStorage.setItem("Events", JSON.stringify(mockedEventsCopy));
};

export {
  saveEvents,
  styles,
  getFromLocalStorage,
  getAvatarAndName,
  handleButtonEvent,
  showDetailEventClicked,
  signOutFunction,
};
