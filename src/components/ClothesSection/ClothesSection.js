import React, { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ClothesSection = ({ cards, onSelectCard, onCreateModal, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);
  const filteredCards = cards.filter((item) => {
    return item.owner === currentUser._id;
  });

  return (
    <div className="clothingsection">
      <div className="clothingsection__title">
        <p>Your items</p>
        <button
          className="clothingsection__button"
          onClick={onCreateModal}
          type="text"
        >
          + Add new
        </button>
      </div>
      <div className="clothingsection__cards">
        {filteredCards.map((item) => (
          <ItemCard
            item={item}
            key={item?._id ?? item?.id}
            onSelectCard={onSelectCard}
            onCardLike={onCardLike}
          />
        ))}
      </div>
    </div>
  );
};

export default ClothesSection;
