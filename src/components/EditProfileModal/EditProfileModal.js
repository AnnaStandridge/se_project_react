import React, { useState } from "react";
import { useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ handleCloseModal, onUserChanges }) => {
  /* ------------------------------ Set handlers ------------------------------ */
  const currentUser = useContext(CurrentUserContext);
  const _id = currentUser._id;

  const [name, setName] = useState(currentUser.name);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatar, setavatar] = useState(currentUser.avatar);
  const handleAvatarChange = (e) => {
    setavatar(e.target.value);
  };

  const isEnabled = name.length > 0 && avatar.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUserChanges({ name: name, avatar: avatar, _id: _id });
    console.log(name, avatar);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      onClose={handleCloseModal}
      onSubmit={handleSubmit}
      isEnabled={isEnabled}
    >
      <label>
        <h3 className="modal_form-input-title">Name</h3>
        <input
          className="modal_form-input"
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          minLength="1"
          maxLength="30"
        ></input>
      </label>
      <label>
        <h3 className="modal_form-input-title">Avatar URL</h3>
        <input
          className="modal_form-input"
          type="url"
          name="link"
          value={avatar}
          onChange={handleAvatarChange}
          minLength="1"
        ></input>
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
