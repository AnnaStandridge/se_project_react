import "./ItemCard.css";
import unliked_button from "../../images/like-inactive.svg";
import liked_button from "../../images/like-active.svg";
import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemCard = ({ item, onSelectCard, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);

  const itemLikeButtonSrc = `${isLiked ? liked_button : unliked_button}`;

  let isAuthorized = false;
  if (currentUser !== "") {
    isAuthorized = true;
  } else {
    isAuthorized = false;
  }

  const cardLikeButton = `card_like-button ${
    isAuthorized ? "card_like-button_visible" : "card_like-button_hidden"
  }`;

  return (
    <div className="card">
      <img
        className="card_image"
        src={item.imageUrl}
        alt={item.name}
        onClick={() => onSelectCard(item)}
      />
      <div className="card_title">
        <p className="card_name">{item.name}</p>
        <img
          className={cardLikeButton}
          src={itemLikeButtonSrc}
          onClick={() => onCardLike(item._id, isLiked, currentUser)}
        />
      </div>
    </div>
  );
};

export default ItemCard;
