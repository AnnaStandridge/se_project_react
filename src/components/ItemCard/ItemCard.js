import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="card">
      <div>
        <img
          className="card_image"
          src={item.imageUrl}
          alt={item.name}
          onClick={() => onSelectCard(item)}
        />
      </div>
      <h3 className="card_name">{item.name}</h3>
    </div>
  );
};

export default ItemCard;
