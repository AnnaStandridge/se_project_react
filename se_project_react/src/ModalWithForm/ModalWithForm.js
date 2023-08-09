import "./ModalWithForm.css";

const ModalWithForm = ({ children, title, onClose, name }) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <form className="modal__form">
          <h3 className="modal__title">{title}</h3>
          {children}
          <button className="modal__button" type="submit">
          Add garment
        </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
