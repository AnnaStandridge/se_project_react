import "./Header.css";
import wtwrLogo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useContext } from "react";

const date = new Date();
const month = date.toLocaleString("default", { month: "long" });
const day = date.getDate();
const formattedDate = `${month} ${day}, New York`;

const Header = ({ onCreateModal, onSignUpModal, onLoginModal, loggedIn }) => {
  const currentUser = useContext(CurrentUserContext);
  const avatar = currentUser ? currentUser.avatar : "";
  console.log(currentUser);
  const name = currentUser ? currentUser.name : "";
  const showAvatar = avatar !== "" ? true : false;

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={wtwrLogo} alt="logo" />
          </Link>
        </div>
        <div>{formattedDate}</div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        {loggedIn ? (
          <>
            <div>
              <button
                className="header__button"
                type="text"
                onClick={onCreateModal}
              >
                + Add clothes
              </button>
            </div>
            <Link to="/profile">{name}</Link>
            <div>
              {showAvatar ? (
                <img src={avatar} className="header__avatar-img" alt="avatar" />
              ) : (
                <p className="sidebar__avatar-placeholder">
                  {name[0]?.toUpperCase()}
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="header__registration">
            <button className="header__reg-button" onClick={onSignUpModal}>
              Sign Up
            </button>
            <button className="header__reg-button" onClick={onLoginModal}>
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
