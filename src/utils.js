import { makeStyles } from "tss-react/mui";

const styles = makeStyles()(() => {
  return {
    textFieldStyle: {
      marginBottom: 14,
      width: "80%",
    },
  };
});

const paintAvatarAndName = (setTextAvatar, setUserName) => {
  const informationUser = getFromLocalStorage();

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

export {
  styles,
  getFromLocalStorage,
  paintAvatarAndName,
  handleButtonEvent,
  showDetailEventClicked,
  signOutFunction,
};
