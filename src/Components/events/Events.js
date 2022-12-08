import { Avatar, Button } from "@mui/material";
import { mockedEvents } from "../../utils";
import "./dashboardStyles.scss";

const DashboardComponent2 = (props) => {
  const items = mockedEvents.map((element, index) => {
    return (
      <div key={index} className={`element-${index} element`}>
        <spam className="date-time">{element.dateAndTime}</spam>
        <h4 className="title-event">{element.nameEvent}</h4>
        <p className="p-host">{element.host}</p>
        <p className="description-event">{element.descriptionEvent}</p>
        <span className="attendees">{element.attendees}</span>
        <Button className="button-event">{element.buttonEvent}</Button>
      </div>
    );
  });
  return (
    <div className="event-container">
      <section className="user-name">
        <Avatar>{props.textAvatar}</Avatar>
        <span>{props.userName}</span>
      </section>
      <nav>
        <a href="#">All events</a>
        <a href="#">Future Events</a>
        <a href="#">Past Events</a>
      </nav>
      <div className="box-event">{items}</div>;
    </div>
  );
};

export default DashboardComponent2;
