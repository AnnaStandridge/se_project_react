import "./ItemModal.css";
import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemModal = ({ selectedCard, onClose, handleDeleteCard }) => {
  const currentUser = useContext(CurrentUserContext);
  const token = localStorage.getItem("jwt");
  const isOwn = selectedCard.owner === currentUser._id;

  const modalDeleteClass = `modal__delete-button ${
    isOwn ? "modal__delete-button_visible" : "modal__delete-button_hidden"
  }`;

  return (
    <div className="modal">
      <div className="modal__content-item">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="modal__image"
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
        />
        <div className="modal__text">
          <p className="modal__text-clothes">{selectedCard.name}</p>
          <p className="modal__text_weather">
            Weather type: {selectedCard.weather}
          </p>
        </div>
        <button
          type="button"
          className={modalDeleteClass}
          onClick={() => handleDeleteCard(selectedCard, token)}
        >
          Delete item
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
