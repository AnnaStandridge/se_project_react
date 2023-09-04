import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import React, { useContext } from "react";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const imageSrc = weatherOptions.filter((option) => {
    return option.day === day && option.type === type;
  });

  const imageSrcUrl = imageSrc[0].url || "";

  return (
    <section className="weather" id="header">
      <div className="weather__info">
        {weatherTemp}°{currentTemperatureUnit}
      </div>
      <img className="weather__image" src={imageSrcUrl} alt="weather img" />
    </section>
  );
};

export default WeatherCard;
