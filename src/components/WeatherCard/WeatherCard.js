import "./WeatherCard.css";

const weatherOptions = [
  {
    url: require("../../images/day/sunny-day.svg").default,
    day: true,
    type: "sunny",
  },
  {
    url: require("../../images/day/cloudy-day.svg").default,
    day: true,
    type: "cloudy",
  },
  {
    url: require("../../images/day/rainy-day.svg").default,
    day: true,
    type: "rainy",
  },
  {
    url: require("../../images/day/stormy-day.svg").default,
    day: true,
    type: "stormy",
  },
  {
    url: require("../../images/day/snowy-day.svg").default,
    day: true,
    type: "snowy",
  },
  {
    url: require("../../images/day/foggy-day.svg").default,
    day: true,
    type: "foggy",
  },
  {
    url: require("../../images/night/clear-night.svg").default,
    day: false,
    type: "night",
  },
  {
    url: require("../../images/night/cloudy-night.svg").default,
    day: false,
    type: "cloudy",
  },
  {
    url: require("../../images/night/rainy-night.svg").default,
    day: false,
    type: "rainy",
  },
  {
    url: require("../../images/night/stormy-night.svg").default,
    day: false,
    type: "stormy",
  },
  {
    url: require("../../images/night/snowy-night.svg").default,
    day: false,
    type: "snowy",
  },
  {
    url: require("../../images/night/foggy-night.svg").default,
    day: false,
    type: "foggy",
  },
];

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
