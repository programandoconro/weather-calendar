import { CurrentWeather } from "@/app/model";
import styles from "./current-weather-card.module.css";
import { weatherBackgroundColor } from "@/app/utils/weather-background-color";
import WeatherIcon from "@/app/ui/weather-icon";
import Temperature from "@/app/ui/temperature";
import Wind from "@/app/ui/wind";
import { Popup } from "@/app/ui/popup";

export default function CurrentWeatherCard(props: {
  currentWeather: CurrentWeather;
}) {
  const { currentWeather } = props;
  const { icon, description, main } = currentWeather.weather[0];
  const rain = currentWeather.rain?.["1h"];

  const weatherPopupContent = (
    <span style={{ textTransform: "capitalize" }}>
      {description}
      {rain ? <span style={{ textTransform: "none", display: "block" }}>{rain.toFixed(1)} mm</span> : ""}
    </span>
  );

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: weatherBackgroundColor(main) }}
    >
      <h5>現在の時間</h5>

      <Popup content={weatherPopupContent}>
        <WeatherIcon icon={icon} />
      </Popup>

      <Temperature
        temperature={currentWeather.main.temp}
        feelsLike={currentWeather.main.feels_like}
        humidity={currentWeather.main.humidity}
      />
      <Wind wind={currentWeather.wind.speed} />
    </div>
  );
}
