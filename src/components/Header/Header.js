import "./Header.css";
import wtwrLogo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

const Header = ({ onCreateModal }) => {

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={wtwrLogo} alt="logo" />
          </Link>
        </div>
        <div>June 15, New York</div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        <div>
          <button
            className="header__button"
            type="text"
            onClick={onCreateModal}
          >
            + Add clothes
          </button>
        </div>
        <Link to="/profile">Terrence Tegegne</Link>
        <div>
          <img src={avatar} alt="logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
