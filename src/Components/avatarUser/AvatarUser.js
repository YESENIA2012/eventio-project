import { Avatar } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";

import Modal from "../modal/Modal";
import "./avatarStyles.scss";

const AvatarUser = ({ user }) => {
  const [seeModal, setSeeModal] = useState(false);
  const name = user?.name ??'';
  const lastName = user?.lastName ??'';
  const firsLetterName = name[0];
  const firstLetterLastName = lastName[0];
  const textAvatar = `${firsLetterName} ${firstLetterLastName}`;
  const userName = `${name} ${lastName}`;

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
