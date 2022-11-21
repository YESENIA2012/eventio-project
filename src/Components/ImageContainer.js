import React from "react";
import { Hidden } from "@mui/material";

const Image = () => {
  return (
    <Hidden smDown>
      <img
        src="https://raw.githubusercontent.com/erick2014/events-app/master/src/assets/images/starWars.png"
        alt="star wars stormtroopers"
      />
    </Hidden>
  );
};

export default Image;
