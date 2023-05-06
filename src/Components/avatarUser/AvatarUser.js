import { Avatar } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState, useEffect, useContext } from "react";

import Modal from "../modal/Modal";
import "./avatarStyles.scss";

const AvatarUser = ({ user }) => {
  const [seeModal, setSeeModal] = useState(false);
  const [textAvatar, setTextAvatar] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = user && user.name ? user.name : "";
    const lastName = user && user.lastName ? user.lastName : "";
    const firsLetterName = name[0];
    const firstLetterLastName = lastName[0];
    const letterAvatar = `${firsLetterName} ${firstLetterLastName}`;
    const userName = `${name} ${lastName}`;
    setTextAvatar(letterAvatar);
    setUserName(userName);
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
