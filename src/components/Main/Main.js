import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  weatherTemp,
  onSelectCard,
  onCardLike,
  clothingItems,
  loggedIn,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 999;

  const getWeatherType = () => {
    if (currentTemperatureUnit === "C") {
      if (temp >= 30) {
        return "hot";
      } else if (temp >= 19 && temp <= 29) {
        return "warm";
      } else if (temp <= 18) {
        return "cold";
      }
    }

    if (temp >= 86) {
      return "hot";
    } else if (temp >= 66 && temp <= 85) {
      return "warm";
    } else if (temp <= 65) {
      return "cold";
    }
  };

  const weatherType = getWeatherType();

  const filteredCards = clothingItems.filter((item) => {
    debugger;
    return item?.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={true} type="sunny" weatherTemp={temp} />
      <section className="card_section" id="card-section">
        <div className="card__title">
          Today is {temp}°{currentTemperatureUnit}/ You may want to wear:
        </div>
        <div className="card_items">
          {filteredCards.map((item) => (
            <ItemCard
              item={item}
              onSelectCard={onSelectCard}
              onCardLike={onCardLike}
              key={item._id || item.id}
              loggedIn={loggedIn}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
