import "./ItemModal.css";
import React from "react";

const ItemModal = ({ selectedCard, onClose, handleDeleteCard }) => {
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
          className="modal__delete-button"
          onClick={() => handleDeleteCard(selectedCard.id)}
        >
          Delete item
        </button>
      </div>
    </div>
  );
};

export default ItemModal;
