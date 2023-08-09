import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className="modal">
      <div className="modal__content-item">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <img className="modal__image" src={selectedCard.link} />
        <div className="modal__text">
          <div className="modal__text-clothes">{selectedCard.name}</div>
          <div>Weather type: {selectedCard.weather}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
