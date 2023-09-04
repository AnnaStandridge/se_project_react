import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, handleAddItemSubmit, isOpen }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [imageUrl, setUrl] = useState("");
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItemSubmit({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      title="New Garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__input">
        Name
        <input
          className="modal__input_label"
          type="text"
          name="name"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label className="modal__input">
        Image
        <input
          className="modal__input_label"
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          minLength="1"
          value={imageUrl}
          onChange={handleUrlChange}
        />
      </label>
      <p className="modal__radio_title">Select the weather type:</p>
      <div className="modal__radio">
        <div>
          <input
            type="radio"
            id="hot"
            value="hot"
            onChange={handleWeatherChange}
          />
          <label>Hot</label>
        </div>
        <div>
          <input
            className="modal__radio_button"
            type="radio"
            id="warm"
            value="warm"
            onChange={handleWeatherChange}
          />
          <label>Warm</label>
        </div>
        <div>
          <input
            type="radio"
            id="cold"
            value="cold"
            onChange={handleWeatherChange}
          />
          <label>Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
