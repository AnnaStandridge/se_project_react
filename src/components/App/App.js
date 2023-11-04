import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { useState, useEffect } from "react";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";
import api from "../../utils/api";
import auth from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useHistory } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddItemSubmit = (item) => {
    api
      .postItems(item)
      .then((newItem) => {
        setClothingItems([newItem.data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
  };

  const handleDeleteCard = (card) => {
    const token = localStorage.getItem("jwt");
    setIsLoading(true);
    api
      .removeItems(card._id, token)
      .then(() => {
        setClothingItems((cards) => cards.filter((c) => c._id !== card._id));
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteConfirmationModal = (selectedCard) => {
    setActiveModal("confirmation-opened");
    setSelectedCard(selectedCard);
  };

  const handleSignupModal = () => {
    setActiveModal("signup");
  };

  const handleSignUp = (user) => {
    auth
      .createUser(user)
      .then((newUser) => {
        console.log(newUser);
        setloggedIn(true);
        setCurrentUser(newUser.data);
        handleCloseModal();
        localStorage.setItem("jwt", newUser.token);
        console.log(currentUser);
      })
      .catch(console.error);
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleLogin = (user) => {
    auth
      .login(user)
      .then((res) => {
        setCurrentUser(res.user);
        localStorage.setItem("jwt", res.token);
        setloggedIn(true);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleEditProfileModal = () => {
    setActiveModal("editProfile");
  };

  const handleUserChanges = (editUser) => {
    auth
      .editProfile(editUser)
      .then((newUser) => {
        console.log(newUser);
        setCurrentUser(newUser);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleLogOut = () => {
    setCurrentUser("");
    localStorage.removeItem("jwt");
    setloggedIn(false);
    history.push("/");
  };

  const handleLikeClick = (_id, isLiked, user) => {
    debugger;
    isLiked
      ? api
          .removeCardLike(_id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) => (card._id === _id ? updatedCard.data : card))
            );
          })
          .catch(console.error)
      : api
          .addCardLike(_id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((card) => (card._id === _id ? updatedCard.data : card))
            );
          })
          .catch(console.error);
  };

  useEffect(() => {
    api
      .fetchItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setloggedIn(true);
          }
        })
        .catch(console.error);
    }
  }, []);

  return (
    <div>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            onCreateModal={handleCreateModal}
            onSignUpModal={handleSignupModal}
            onLoginModal={handleLoginModal}
            loggedIn={loggedIn}
          />
          <Switch>
            <Route exact path="/">
              <Main
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
                onCardLike={handleLikeClick}
                loggedIn={loggedIn}
              />
            </Route>
            <ProtectedRoute path="/profile" loggedIn={loggedIn}>
              <Profile
                clothingItems={clothingItems}
                onSelectCard={handleSelectedCard}
                onCreateModal={handleCreateModal}
                onEditProfile={handleEditProfileModal}
                onLogout={handleLogOut}
                onCardLike={handleLikeClick}
                loggedIn={loggedIn}
              ></Profile>
            </ProtectedRoute>
          </Switch>
          <Footer />
          {activeModal === "create" && (
            <AddItemModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "create"}
              handleAddItemSubmit={handleAddItemSubmit}
              buttonText={isLoading ? "Saving..." : "Save"}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectedCard}
              handleDeleteCard={handleDeleteConfirmationModal}
              onClose={handleCloseModal}
              buttonText={isLoading ? "Deleting..." : "Delete"}
            />
          )}
          {activeModal === "confirmation-opened" && (
            <DeleteModal
              onClose={handleCloseModal}
              card={selectedCard}
              handleDeleteCard={handleDeleteCard}
              buttonText={isLoading ? "Deleting..." : "Delete"}
            />
          )}
          {activeModal === "signup" && (
            <RegisterModal
              handleCloseModal={handleCloseModal}
              onSignUp={handleSignUp}
              onLogInModal={handleLoginModal}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              handleCloseModal={handleCloseModal}
              onLogin={handleLogin}
              onSignUpModal={handleSignupModal}
            />
          )}
          {activeModal === "editProfile" && (
            <EditProfileModal
              handleCloseModal={handleCloseModal}
              onUserChanges={handleUserChanges}
            />
          )}
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
