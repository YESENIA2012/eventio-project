import { Avatar } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState, useEffect } from "react";

import Modal from "../modal/Modal";
import { paintAvatarAndName } from "../../utils";
import "./avatarStyles.scss";

const AvatarUser = () => {
  const [seeModal, setSeeModal] = useState(false);
  const [textAvatar, setTextAvatar] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    paintAvatarAndName(setTextAvatar, setUserName);
  }, []);

  return (
    <section className="user-name-container">
      <div className="avatar-name-container">
        <Avatar>{textAvatar}</Avatar>
        <span className="user-name-text">{userName}</span>
        <span
          className="arrow-container"
          onClick={() => {
            setSeeModal(!seeModal);
          }}
        >
          <ArrowDropDownIcon />
        </span>
      </div>
      <div className={seeModal ? "modal-container" : "hide-modal-container"}>
        <Modal />
      </div>
    </section>
  );
};

export default AvatarUser;
