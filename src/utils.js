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

const joinEvent = async (eventDetail, userId) => {
  try {
    const endpoint = "events/join"
    const method = "POST"
    const body = {
      eventId : eventDetail.id,
      userId : userId,
    }
    const joinEventResult = await request(endpoint, method, body);
    return joinEventResult
  } catch (error) {
    console.log("Error", error)
  }
};

const getTextButton = (userId, eventDetail) => {
  let textButton = "";

  if (userId === eventDetail.eventOwner) {
    textButton = "edit";
  } else if (eventDetail.attendees.includes(String(userId))) {
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
    setErrorJoinEvents
  } = parameters;

  if (textButton === "edit") {
    setGoToEditEvent(true);
    setEventToEdit(eventDetail.id);
  } else if (textButton === "leave") {
    await updateEventAttendees(eventDetail, userId);
    setRefreshEvents(true);
  } else {
    const result = await joinEvent(eventDetail, userId);
    if(!result){
      setErrorJoinEvents(true)
    }
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
  getTextButton,
  handleButtonEvent,
  getButtonClassName,
  request,
  joinEvent
};
