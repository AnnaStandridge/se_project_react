import "./Header.css";
import wtwrLogo from "../../images/logo.svg";
import avatar from "../../images/avatar.svg";

const Header = ({ onCreateModal }) => {
  console.log("Header");

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={wtwrLogo} alt="logo" />
        </div>
        <div>June 15, New York</div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button
            className="header__button"
            type="text"
            onClick={onCreateModal}
          >
            + Add clothes
          </button>
        </div>
        <div>Terrence Tegegne</div>
        <div>
          <img src={avatar} alt="logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
