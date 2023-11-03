import "./ItemCard.css";
import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemCard = ({ item, onSelectCard, onCardLike, loggedIn }) => {
  const currentUser = useContext(CurrentUserContext);
  const cardId = item._id;
  const userId = currentUser ? currentUser._id : "";
  const isLiked = item.likes.some((id) => id === currentUser._id);

  const likeButtonClass = isLiked
    ? "card__like-button card__like-button-active"
    : "card__like-button ";

  const handleLikeClick = () => {
    onCardLike({ _id: cardId, isLiked: isLiked, user: userId });
  };

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
        {loggedIn ? (
          <button
            className={likeButtonClass}
            type="button"
            onClick={handleLikeClick}
          />
        ) : (
          <button className="card__like-button-hidden" />
        )}
      </div>
    </div>
  );
};

export default ItemCard;
