import React from "react";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const avatarImage = currentUser ? currentUser.avatar : undefined;
  const name = currentUser ? currentUser.name : "";
  const avatarImageExist = avatarImage !== "" ? true : null;
  console.log(avatarImageExist);
  return (
    <section className="sidebar">
      <div className="sidebar__user-info">
        {avatarImageExist ? (
          <img
            src={avatarImage}
            alt="avatar"
            className="sidebar__avatar-image"
          />
        ) : (
          <p className="sidebar__avatar-placeholder">
            {name[0]?.toUpperCase()}
          </p>
        )}
        <h3 className="sidebar__avatar-name">{currentUser.name}</h3>
      </div>
      <h3 className="sidebar__options" onClick={onEditProfile}>
        Change profile data
      </h3>
      <h3 className="sidebar__options" onClick={onLogout}>
        Log out
      </h3>
    </section>
  );
}

export default SideBar;
