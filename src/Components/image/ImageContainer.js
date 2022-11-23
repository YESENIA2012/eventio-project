import React from "react";
import { Hidden } from "@mui/material";
import "./imageStyle.scss";

const Image = () => {
  return (
    <Hidden smDown>
      <img
        src="https://raw.githubusercontent.com/erick2014/events-app/master/src/assets/images/starWars.png"
        alt="star wars stormtroopers"
      />
      <div className="text-image">
        <p className="p-image">“Great, kid. Don't get cocky.”</p>
        <span className="span-2">_</span>
        <p className="p-image-2">Han solo</p>
      </div>
    </Hidden>
  );
};

export default Image;
