import { useState, Fragment } from "react";

const DashboardComponent = (props) => {
  return (
    <div>
      Dashboard page
      <div>{props.textAvatar}</div>
    </div>
  );
};

export default DashboardComponent;
