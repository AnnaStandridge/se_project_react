import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  console.log("weather card");

  const imageSrc = weatherOptions.filter((i) => {
    console.log(i);
    return i.day === day && i.type === type;
  });

  console.log(imageSrc);

  const imageSrcUrl = imageSrc[0].url || "";

  return (
    <section className="weather" id="header">
      <div className="weather__info">{weatherTemp} F</div>
      <img className="weather__image" src={imageSrcUrl} alt="weather img" />
    </section>
  );
};

export default WeatherCard;
