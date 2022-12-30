import "./detailEventStyle.scss";

const DetailEvent = (props) => {
  const { goToDetailEvent } = props;

  return (
    <div
      className={
        goToDetailEvent ? "container-event-section" : "event-detail-hidden"
      }
    >
      <p className="container-event-section">EVENT DETAILS</p>
    </div>
  );
};

export default DetailEvent;
